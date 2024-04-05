import { Module } from '@nestjs/common';
import { DatabaseModule } from '@common/database';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { COMMANDS } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [AuthorController],
    providers: [AuthorRepository, ...COMMANDS],
})
export class AuthorModule {}
