import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peripheral } from './entities';
import { PeripheralController } from './peripheral.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Peripheral])
  ],
  controllers: [PeripheralController],

})
export class PeripheralModule {}
