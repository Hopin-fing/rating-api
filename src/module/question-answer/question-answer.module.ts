import { Module } from '@nestjs/common';
import { QuestionAnswerController } from './question-answer.controller';
import { DatabaseModule } from '@common/database';
import { QuestionAnswerRepository } from './question-answer.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [QuestionAnswerController],
    providers: [QuestionAnswerRepository],
})
export class QuestionAnswerModule {}
