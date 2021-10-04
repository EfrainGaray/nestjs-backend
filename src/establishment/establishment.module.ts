import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment, Room } from './entities';

import { EstablishmentController } from './establishment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Establishment, Room])
],
  controllers: [EstablishmentController]
})
export class EstablishmentModule {}
