import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Establishment, Parameter, Room, Session } from './entities';
import { EstablishmentController } from './controllers/establishment.controller';
import { EstablismentService } from './services';
import { ContactService } from './services/contact.service';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { ContactController } from './controllers';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import { ParameterService } from './services/parameter.service';
import { ParameterController } from './controllers/parameter.controller';
import { Peripheral } from 'src/peripheral/entities';
import { PeripheralService } from 'src/peripheral/services';


@Module({                                                              
  imports: [
    TypeOrmModule.forFeature([Establishment, Room, Contact, Parameter,Session, Peripheral])
],
  controllers: [EstablishmentController, ContactController,  RoomController, SessionController, ParameterController],
  providers: [EstablismentService, ContactService, RoomService,  SessionService, ParameterService, EstablismentService, PeripheralService]
})
export class EstablishmentModule {}                                
