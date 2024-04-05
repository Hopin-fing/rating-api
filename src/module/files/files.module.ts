import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FilesController } from './files.controller';
import { GenerateService } from './generate.service';
import { UploadHandler } from '@common/integrations/bucket/command/upload/upload.handler';

@Module({
    imports: [CqrsModule],
    controllers: [FilesController],
    providers: [GenerateService, UploadHandler],
})
export class FilesModule {}
