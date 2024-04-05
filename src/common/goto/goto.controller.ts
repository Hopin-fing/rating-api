import { CommandBus } from '@nestjs/cqrs';
import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { IncrementClickCountCommand } from '../../module/product/commands/increment-click-count/increment-product.command';
import { GotoHashLinkCommmand } from './command/goto-hash-link.command';

@Controller('goto')
export class GotoController {
    constructor(private readonly commandBus: CommandBus) {}
    @Get(':hash')
    @Redirect('https://sitetoredirect.com', 301)
    async goto(@Param('hash') hash: string, @Query('productId') productId: string) {
        const decodedLink = await this.commandBus.execute(new GotoHashLinkCommmand(hash));
        this.commandBus.execute(new IncrementClickCountCommand(productId));
        return { url: decodedLink };
    }
}
