import { PrismaService } from '@common/database/prisma.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { QuestionAnswer } from '@prisma/client';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionAnswerRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async create(dto: CreateQuestionAnswerDto): Promise<Pick<QuestionAnswer, 'uuid'>> {
        return this.prisma.questionAnswer.create({
            data: {
                postUuid: dto?.postUuid,
                question: dto?.question,
                answer: dto?.answer,
            },
            select: {
                uuid: true,
            },
        });
    }

    public async updateById(dto: UpdateQuestionAnswerDto): Promise<Pick<QuestionAnswer, 'uuid'>> {
        return this.prisma.questionAnswer.update({ where: { uuid: dto?.uuid }, data: { ...dto } });
    }

    public async deleteById(id: string) {
        return this.prisma.questionAnswer.delete({
            where: {
                uuid: id,
            },
        });
    }
}
