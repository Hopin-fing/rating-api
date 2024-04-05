import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '@common/database';
import { UserRepository } from './user.repository';
import { QUERIES } from './query';
import { COMMANDS } from './command';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from '@common/integrations/email/email.module';

@Module({
    imports: [DatabaseModule, CqrsModule, EmailModule],
    controllers: [UserController],
    providers: [...QUERIES, ...COMMANDS, UserRepository, JwtService],
})
export class UserModule {}
