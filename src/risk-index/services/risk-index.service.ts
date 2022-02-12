import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { max } from 'class-validator';
import { Parameter, Room, Session } from 'src/establishment/entities';
import { BioepidermiologicalParameters, EnviromentParameter } from 'src/peripheral/entities';
import { Double, getRepository, Repository } from 'typeorm';

@Injectable()
export class RiskIndexService {

    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
        @InjectRepository(EnviromentParameter) private readonly enviromentalParameterRepository: Repository<EnviromentParameter>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Parameter) private readonly parameterRepository: Repository<Parameter>,
        @InjectRepository(BioepidermiologicalParameters) private readonly bioepidermiologicalParametersRepository: Repository<BioepidermiologicalParameters>
    ) {}

    async riskValue(): Promise<Double>{
        const CO2 = await this.enviromentalParameterRepository.createQueryBuilder("enviroment_parameter").select("enviroment_parameter.CO2, enviroment_parameter.id").orderBy("enviroment_parameter.id", "DESC").getRawOne();
        const backgroundCO2 = await this.sessionRepository.createQueryBuilder("session").select("session.background_CO2").getOne();
        const duration = await this.sessionRepository.createQueryBuilder("session").select("session.duration").getOne();
        const inhalationMaskEfficiency = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.inhalation_efficiency").getOne();
        const personsWithMask = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.persons_with_mask").getOne();
        const exhalationRate = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.exhalation_rate").getOne();
        const infectedPeople = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.people_infected").getOne();
        const exteriorVentilation = await this.sessionRepository.createQueryBuilder("session").select("session.exterior_ventilation").getOne();
        const decayRate = await this.bioepidermiologicalParametersRepository.createQueryBuilder("bioepidermiological_parameters").select("bioepidermiological_parameters.decay_rate").getOne();
        const depositionSurficies = await this.bioepidermiologicalParametersRepository.createQueryBuilder("bioepidermiological_parameters").select("bioepidermiological_parameters.deposition_surficies").getOne();
        const additionalMeasures = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.additional_measures").getOne();
        const breathingRate = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.respiratory_rate").getOne();
        const lengthRoom = await this.roomRepository.createQueryBuilder("room").select("room.length").getOne();
        const heightRoom = await this.roomRepository.createQueryBuilder("room").select("room.height").getOne();
        const widthRoom = await this.roomRepository.createQueryBuilder("room").select("room.width").getOne();
        const exhalationMaskEfficiency = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.exhalation_efficiency").getOne();

        //Resolución de fórmula
        const volume = lengthRoom.length * heightRoom.height * widthRoom.width;
        const duration2 = duration.duration/60;
        const quantaExhalationRate = exhalationRate.exhalation_rate;
        const totalFirstOrderLossRate = exteriorVentilation.exterior_ventilation + decayRate.decay_rate + depositionSurficies.deposition_surficies + additionalMeasures.additional_measures;
        const netEmissionRate =  quantaExhalationRate * (1 - (exhalationMaskEfficiency.exhalation_efficiency/100) * (personsWithMask.persons_with_mask/100)) * infectedPeople.people_infected;
        const avgQuantaConcentration = netEmissionRate / totalFirstOrderLossRate / volume * (1 - (1 / totalFirstOrderLossRate / duration2) * (1 - Math.exp(-1 * totalFirstOrderLossRate * duration2)));
        const quantaInhaledPerson = avgQuantaConcentration * breathingRate.respiratory_rate * duration2 * (1 -( inhalationMaskEfficiency.inhalation_efficiency/100) * (personsWithMask.persons_with_mask/100));
        const infectionProbability = 1 - Math.exp(quantaInhaledPerson * -1);

        const CO2reInhaled = (CO2.CO2-backgroundCO2.background_CO2) * duration2;
        const CO2reInhaledPor = CO2reInhaled / 10000; 
        const ratioProbInfection = Number((infectionProbability/CO2reInhaledPor).toFixed(3));
       
        return ratioProbInfection;
    }
}
