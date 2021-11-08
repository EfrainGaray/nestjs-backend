import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Establishment, Parameter, Room, Session } from './entities';
import { EstablishmentController } from './controllers/establishment.controller';
import { EstablismentService } from './services';
import { ContactService } from './services/contact.service';
import { PeripheralService } from './services/peripheral.service';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { SensorController } from './controllers/sensor.controller';
import { SensorService } from './services/sensor.service';
import { PeripheralController } from 'src/peripheral/peripheral.controller';
import { ContactController } from './controllers';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import {Peripheral, Sensor} from "../peripheral/entities";
import { ParameterService } from './services/parameter.service';
import { ParameterController } from './controllers/parameter.controller';

@Module({                                                              
  imports: [
    TypeOrmModule.forFeature([Establishment, Room, Contact, Session, Parameter,Peripheral,Sensor])
],
  controllers: [EstablishmentController, ContactController, PeripheralController, RoomController, SensorController, SessionController, ParameterController],
  providers: [EstablismentService, ContactService, PeripheralService, RoomService, SensorService, SessionService, ParameterService]
})
export class EstablishmentModule {}                                
