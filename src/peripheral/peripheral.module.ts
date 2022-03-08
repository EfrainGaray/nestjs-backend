import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioepidermiologicalParameters, EnviromentParameter, Peripheral, Sensor } from './entities';

import { EnviromentParameterController } from './controllers/enviroment-parameter.controller';
import { EnviromentParameterService } from './services/enviroment-parameter.service';
import { BioepidermiologicalParametersService } from './services/bioepidermiological-parameters.service';
import { BioepidermiologicalParametersController } from './controllers/bioepidermiological-parameters.controller';
import { PeripheralService, SensorService } from './services';
import { PeripheralController, SensorController } from './controllers';
import { EstablismentService } from 'src/establishment/services';
import { Establishment } from 'src/establishment/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Peripheral, EnviromentParameter , BioepidermiologicalParameters, Sensor, Establishment])
  ],
  controllers: [PeripheralController, EnviromentParameterController, BioepidermiologicalParametersController, SensorController],
  providers: [EnviromentParameterService, BioepidermiologicalParametersService, PeripheralService, SensorService, EstablismentService],

})
export class PeripheralModule {}
