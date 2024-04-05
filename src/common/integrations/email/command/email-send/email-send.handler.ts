import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailSendCommand } from './email-send.command';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Logger } from '@nestjs/common';
import { EmailSendResponse } from '../../interfaces/email-send.response';

@CommandHandler(EmailSendCommand)
export class EmailSendHandler implements ICommandHandler<EmailSendCommand> {
    private readonly logger = new Logger(EmailSendHandler.name);

    xApiKey: string;
    emailEndpoint = 'https://api.beta.rusender.ru/api/v1/external-mails/send';
    constructor(private readonly configService: ConfigService) {
        this.xApiKey = this.configService.getOrThrow('RUSENDER_API_KEY');
    }

    async execute({ subject, toEmail, fromEmail, fromName, htmlTemplate }: EmailSendCommand) {
        this.logger.log('Sending email' + toEmail + ' ' + fromEmail + ' ' + fromName + ' ' + subject + ' ' + htmlTemplate);
        try {
            const { data } = await axios.post<EmailSendResponse>(
                this.emailEndpoint,
                {
                    mail: {
                        to: {
                            email: toEmail,
                        },
                        from: {
                            email: fromEmail,
                            name: fromName,
                        },
                        subject: subject,
                        html: htmlTemplate,
                    },
                },
                { headers: { 'X-Api-Key': this.xApiKey } },
            );
            return data;
        } catch (error) {
            this.logger.log(error);
            return null;
        }
    }
}
