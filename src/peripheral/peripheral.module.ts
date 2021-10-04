import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviromentParameter, Peripheral } from './entities';
import { PeripheralController } from './peripheral.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Peripheral, EnviromentParameter ])
  ],
  controllers: [PeripheralController],

})
export class PeripheralModule {}
