import { Module } from '@nestjs/common';
import { UploadHandler } from './command/upload/upload.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    providers: [UploadHandler],
})
export class BucketModule {}
