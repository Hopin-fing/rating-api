import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDomainsQuery } from './query/get-domains/get-domains.query';
import { GetDomainCommands } from '@libs/contracts/commands';

@Controller('domain')
export class DomainController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get('')
    async getAllDomains(): Promise<GetDomainCommands.Response> {
        return this.queryBus.execute(new GetDomainsQuery());
    }
}
