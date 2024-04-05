import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadCommand } from './upload.command';
import S3 from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';

@CommandHandler(UploadCommand)
export class UploadHandler implements ICommandHandler {
    client: S3;
    bucketName: string;

    constructor(private readonly configService: ConfigService) {
        this.client = new S3({
            credentials: {
                accessKeyId: this.configService.getOrThrow('ACCESS_ID'),
                secretAccessKey: this.configService.getOrThrow('SECRET_KEY'),
            },
            endpoint: 'https://hb.bizmrg.com',
            region: 'ru-msk',
        });
        this.bucketName = this.configService.getOrThrow('BUCKET_NAME');
    }

    async execute({ contentType, file, name }: UploadCommand) {
        return this.client
            .upload({
                Bucket: this.bucketName,
                Key: name,
                Body: file,
                ContentType: contentType,
                ACL: 'public-read',
            })
            .promise();
    }
}
