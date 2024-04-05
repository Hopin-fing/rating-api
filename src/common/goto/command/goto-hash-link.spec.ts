import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { GotoHashLinkCommmand } from './goto-hash-link.command';
import { GotoModule } from '../goto.module';

describe('Тестирование модуля Goto', () => {
    let commandBus: CommandBus;
    const encodedLink = 'aHR0cHM6Ly9oYWJyLmNvbQ==';
    const decodedLink = 'https://habr.com';

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [GotoModule],
        }).compile();
        commandBus = moduleRef.get<CommandBus>(CommandBus);
        await moduleRef.init();
    });

    it('Декодирование ссылки', async () => {
        const res = await commandBus.execute(new GotoHashLinkCommmand(encodedLink));
        expect(res).toBe(decodedLink);
    });
});
