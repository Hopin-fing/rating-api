import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDomainsQuery } from './get-domains.query';
import { DomainRepository } from '../../domain.repository';

@QueryHandler(GetDomainsQuery)
export class GetDomainsQueryHandler implements IQueryHandler<GetDomainsQuery> {
    constructor(private readonly domainRepository: DomainRepository) {}
    async execute() {
        return this.domainRepository.findAll();
    }
}
