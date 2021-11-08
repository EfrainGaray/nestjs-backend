import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioepidermiologicalParameters, EnviromentParameter, Peripheral, Sensor } from './entities';
import { PeripheralController } from './peripheral.controller';
import { EnviromentParameterController } from './controllers/enviroment-parameter.controller';
import { EnviromentParameterService } from './services/enviroment-parameter.service';
import { BioepidermiologicalParametersService } from './services/bioepidermiological-parameters.service';
import { BioepidermiologicalParametersController } from './controllers/bioepidermiological-parameters.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Peripheral, EnviromentParameter , BioepidermiologicalParameters, Sensor])
  ],
  controllers: [PeripheralController, EnviromentParameterController, BioepidermiologicalParametersController],
  providers: [EnviromentParameterService, BioepidermiologicalParametersService],

})
export class PeripheralModule {}
