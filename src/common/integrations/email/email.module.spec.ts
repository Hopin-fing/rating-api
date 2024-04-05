import { ConfigModule } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { EmailModule } from './email.module';
import { EmailSendCommand } from './command/email-send/email-send.command';

const data = {
    toEmail: 'evgeniygrebenkin@gmail.com',
    fromEmailCorrect: 'test@purplecode.ru',
    fromEmailWrong: 'test@wrongdomain.ru',
    fromName: 'Ratingus.ru',
    subject: 'Test Letter',
    htmlTemplate: '<h2>TEST LETTER</h2>',
};

describe('Тестирование отправки письма', () => {
    let commandBus: CommandBus;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule],
        }).compile();
        commandBus = moduleRef.get<CommandBus>(CommandBus);
        await moduleRef.init();
    });

    it('Удачная отправка письма', async () => {
        const res = await commandBus.execute<EmailSendCommand>(
            new EmailSendCommand(data.toEmail, data.fromEmailCorrect, data.fromName, data.subject, data.htmlTemplate),
        );
        expect(res.uuid).toBeDefined();
    });

    it('Неудачная отправка письма', async () => {
        const res = await commandBus.execute<EmailSendCommand>(
            new EmailSendCommand(data.toEmail, data.fromEmailWrong, data.fromName, data.subject, data.htmlTemplate),
        );
        expect(res).toBe(null);
    });
});
