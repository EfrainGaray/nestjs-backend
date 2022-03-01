import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter, Room, Session } from 'src/establishment/entities';
import { BioepidermiologicalParameters, EnviromentParameter } from 'src/peripheral/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RiskIndexService {

    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
        @InjectRepository(EnviromentParameter) private readonly enviromentalParameterRepository: Repository<EnviromentParameter>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Parameter) private readonly parameterRepository: Repository<Parameter>,
        @InjectRepository(BioepidermiologicalParameters) private readonly bioepidermiologicalParametersRepository: Repository<BioepidermiologicalParameters>
    ) {}

    async riskValue(co2:number): Promise<Number>{
        console.log(co2);
        //const CO2 = await this.enviromentalParameterRepository.createQueryBuilder("enviroment_parameter").select("enviroment_parameter.CO2, enviroment_parameter.id").orderBy("enviroment_parameter.id", "DESC").getRawOne();
        const CO2 = co2;
        const roomData = await this.roomRepository.createQueryBuilder("room").select("room.length, room.height, room.width").getRawOne();
        const sessionData = await this.sessionRepository.createQueryBuilder("session").select("session.background_CO2, session.duration, session.exterior_ventilation").getRawOne();
        const bioEpidermioData = await this.bioepidermiologicalParametersRepository.createQueryBuilder("bioepidermiological_parameters").select("bioepidermiological_parameters.decay_rate, bioepidermiological_parameters.deposition_surficies").getRawOne();
        const parameterData = await this.parameterRepository.createQueryBuilder("parameter").select("parameter.inhalation_efficiency, parameter.persons_with_mask, parameter.exhalation_rate, parameter.people_infected, parameter.additional_measures, parameter.respiratory_rate, parameter.exhalation_efficiency").getRawOne();

        if (!CO2 || !roomData || !sessionData || !bioEpidermioData || !parameterData) throw new BadRequestException('System could not find the value');
        
        //Resolución de fórmula
        const volume = roomData.length * roomData.height * roomData.width;
        const duration2 = sessionData.duration/60;
        const quantaExhalationRate = parameterData.exhalation_rate;
        const totalFirstOrderLossRate = sessionData.exterior_ventilation + bioEpidermioData.decay_rate + bioEpidermioData.deposition_surficies + parameterData.additional_measures;
        const netEmissionRate =  quantaExhalationRate * (1 - (parameterData.exhalation_efficiency/100) * (parameterData.persons_with_mask/100)) * parameterData.people_infected;
        const avgQuantaConcentration = netEmissionRate / totalFirstOrderLossRate / volume * (1 - (1 / totalFirstOrderLossRate / duration2) * (1 - Math.exp(-1 * totalFirstOrderLossRate * duration2)));
        const quantaInhaledPerson = avgQuantaConcentration * parameterData.respiratory_rate * duration2 * (1 -( parameterData.inhalation_efficiency/100) * (parameterData.persons_with_mask/100));
        const infectionProbability = 1 - Math.exp(quantaInhaledPerson * -1);

        const CO2reInhaled = (CO2-sessionData.background_CO2) * duration2;
        const CO2reInhaledPor = CO2reInhaled / 10000; 
        var ratioProbInfection = Number((infectionProbability/CO2reInhaledPor).toFixed(3));

        if (ratioProbInfection==null)throw new BadRequestException('System could not calculate the risk index');

        return ratioProbInfection;
    }
}
