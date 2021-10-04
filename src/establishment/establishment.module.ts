import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities';
import { EstablishmentController } from './establishment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Establishment])
],
  controllers: [EstablishmentController]
})
export class EstablishmentModule {}
