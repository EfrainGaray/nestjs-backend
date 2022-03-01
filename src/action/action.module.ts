import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { MitigatingAction, Person, Process,  AlarmState} from './entities';
import { ProcessService } from './services/process.service';
import { ProcessController } from './controllers/process.controller';
import { MitigatingActionController } from './controllers/mitigating-action.controller';
import { MitigatingActionService } from './services/mitigating-action.service';
import { PersonService } from './services/person.service';
import { PersonController } from './controllers/person.controller';
import { AlarmStateController } from './controllers/alarm-state.controller';
import { AlarmStateService } from './services/alarm-state.service';
import { Room } from 'src/establishment/entities';
import { RoomService } from 'src/establishment/services';
import { EnviromentParameterService } from 'src/peripheral/services';
import { EnviromentParameter } from 'src/peripheral/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Process, Person, MitigatingAction, AlarmState, Room, EnviromentParameter])
],
  controllers: [ActionController, ProcessController, MitigatingActionController, PersonController, AlarmStateController],
  providers: [ProcessService, MitigatingActionService, PersonService, AlarmStateService, RoomService, EnviromentParameterService]
})
export class ActionModule {}
