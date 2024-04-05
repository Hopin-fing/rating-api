import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { QuestionAnswerRepository } from './question-answer.repository';
import { CreateQuestionAnswerDto, CreateQuestionAnswerResponseDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto, UpdateQuestionAnswerResponseDto } from './dto/update-question-answer.dto';
import { DeleteQuestionAnswerDto, DeleteQuestionAnswerResponseDto } from './dto/delete-question-answer.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';

@Controller('question-answer')
export class QuestionAnswerController {
    constructor(private readonly questionAnswerRepository: QuestionAnswerRepository) {}

    @UseGuards(AccessTokenGuard)
    @Post('')
    async create(@Body() dto: CreateQuestionAnswerDto): Promise<CreateQuestionAnswerResponseDto> {
        return this.questionAnswerRepository.create(dto);
    }

    @UseGuards(AccessTokenGuard)
    @Put('')
    async update(@Body() dto: UpdateQuestionAnswerDto): Promise<UpdateQuestionAnswerResponseDto> {
        return this.questionAnswerRepository.updateById(dto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete('')
    async delete(@Body() { uuid }: DeleteQuestionAnswerDto): Promise<DeleteQuestionAnswerResponseDto> {
        return this.questionAnswerRepository.deleteById(uuid);
    }
}
