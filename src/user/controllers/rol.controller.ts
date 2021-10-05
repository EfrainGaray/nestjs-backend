import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolService } from '../services';

@ApiTags('Users routes')
@Controller('role')
export class RolController {
    constructor(
        private roleService: RolService
    ){}
    
}
