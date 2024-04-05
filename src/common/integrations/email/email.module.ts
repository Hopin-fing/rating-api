import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailSendHandler } from './command/email-send/email-send.handler';
import { GenerateEmailHTMLHandler } from './command/email-generate-html/email-generate-html.handler';

const commands = [EmailSendHandler, GenerateEmailHTMLHandler];

@Module({
    imports: [CqrsModule],
    providers: [...commands],
})
export class EmailModule {}
