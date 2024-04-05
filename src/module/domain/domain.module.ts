import { DatabaseModule } from '@common/database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DomainRepository } from './domain.repository';
import { QUERIES } from './query';
import { DomainController } from './domain.controller';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [DomainController],
    providers: [...QUERIES, DomainRepository],
})
export class DomainModule {}
