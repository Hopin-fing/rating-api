import { EmailModule } from './email.module';
import { GenerateEmailHTMLCommand } from './command/email-generate-html/email-generate-html.command';
import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { Template, RestoreTemplateData } from './interfaces/generate-email-html';
import { ConfigModule } from '@nestjs/config';

describe('Тестирование движка работы с письмами', () => {
    let commandBus: CommandBus;
    const data = {
        token: 'test_token_value',
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule],
        }).compile();
        commandBus = moduleRef.get<CommandBus>(CommandBus);
        await moduleRef.init();
    });

    it('Тестовый запуск', async () => {
        const res = await commandBus.execute(new GenerateEmailHTMLCommand<RestoreTemplateData>(data, Template.RecoverPassword));
        expect(res).toContain('ratungus.ru/restore?token=test_token_value');
    });
});
