import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { RiskIndexService } from '../services/risk-index.service';



@ApiTags('Risk Index')
@Controller('risk-index')
export class RiskIndexController {
    constructor(private riskIndexService: RiskIndexService) {
    }

    @Get()
    async value() {
        const data = await this.riskIndexService.riskValue();
        return {data};
    }
}
