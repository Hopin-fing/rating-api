import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GotoController } from './goto.controller';
import { GotoHashLinkCommmandHandler } from './command/goto-hash-link.handler';

@Module({
    imports: [CqrsModule, GotoHashLinkCommmandHandler],
    controllers: [GotoController],
})
export class GotoModule {}
