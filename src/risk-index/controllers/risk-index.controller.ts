import { Controller, Get,Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { RiskIndexService } from '../services/risk-index.service';



@ApiTags('Risk Index')
@Controller('risk-index')
export class RiskIndexController {
    constructor(private riskIndexService: RiskIndexService) {
    }

    @Get('/:co2')
    async value(
             @Request() {params: {co2}}
    ) {
        const data = await this.riskIndexService.riskValue(co2);
        return {data};
    }
}
