import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GotoHashLinkCommmand } from './goto-hash-link.command';

@CommandHandler(GotoHashLinkCommmand)
export class GotoHashLinkCommmandHandler implements ICommandHandler {
    constructor() {}
    async execute({ hash }: GotoHashLinkCommmand) {
        const decodedLink = Buffer.from(hash, 'base64').toString('utf8');
        return decodedLink;
    }
}
