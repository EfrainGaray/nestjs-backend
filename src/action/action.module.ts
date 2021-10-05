import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { AlarmaState, MitigatingAction, Person, Process } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Process, Person, MitigatingAction, AlarmaState])
],
  controllers: [ActionController]
})
export class ActionModule {}
