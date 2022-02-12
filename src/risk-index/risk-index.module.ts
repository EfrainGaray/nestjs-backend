import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parameter, Room, Session } from 'src/establishment/entities';
import { EstablishmentModule } from 'src/establishment/establishment.module';
import { BioepidermiologicalParameters, EnviromentParameter } from 'src/peripheral/entities';
import { RiskIndexController } from './controllers';
import { RiskIndexService } from './services/risk-index.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([Session, EnviromentParameter, Room, Parameter, BioepidermiologicalParameters])
],
  
  controllers: [RiskIndexController],
  providers: [RiskIndexService]
})
export class RiskIndexModule {}
