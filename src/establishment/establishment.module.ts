import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Establishment, Parameter, Room, Session } from './entities';
import { EstablishmentController } from './establishment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Establishment, Room, Contact, Session, Parameter])
],
  controllers: [EstablishmentController]
})
export class EstablishmentModule {}
