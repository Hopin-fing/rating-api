import { BadRequestException, Controller, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { v4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenerateService } from './generate.service';
import { CommandBus } from '@nestjs/cqrs';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { UploadCommand } from '@common/integrations/bucket/command/upload/upload.command';

@Controller('files')
export class FilesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly generateService: GenerateService,
    ) {}

    @UseGuards(AccessTokenGuard)
    @Post('upload-file')
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('folder') folder: string): Promise<{ url: string }> {
        if (!folder) {
            throw new BadRequestException('Укажите сущность для сохранения');
        }
        if (!file) {
            throw new BadRequestException('Файл не найден');
        }
        const filename = v4();
        const res = await this.commandBus.execute(
            new UploadCommand(file.buffer, `images/${folder}/${filename}.${file.originalname.split('.').at(-1)}`, file.mimetype),
        );

        return { url: res.Location };
    }

    @UseGuards(AccessTokenGuard)
    @Post('upload-image')
    @UseInterceptors(FileInterceptor('files'))
    async uploadImage(@UploadedFile() file: Express.Multer.File, @Query('folder') folder: string) {
        if (!folder) {
            throw new BadRequestException('Укажите сущность для сохранения');
        }
        if (!file) {
            throw new BadRequestException('Файл не найден');
        }

        const filename = v4();
        const webP = await this.generateService.convertToWebP(file.buffer, 100);

        const res = await this.commandBus.execute(
            new UploadCommand(file.buffer, `images/${folder}/${filename}.${file.originalname.split('.').at(-1)}`, file.mimetype),
        );

        const resWebP = await this.commandBus.execute(new UploadCommand(webP, `images/${folder}/${filename}.webp`, 'image/webp'));

        return { urls: { original: res.Location, webP: resWebP.Location } };
    }
}
