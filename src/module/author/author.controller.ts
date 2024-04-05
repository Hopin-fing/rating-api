import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto, CreateAuthorResponseDto } from './dto/create-author.dto';
import { UpdateAuthorDto, UpdateAuthorResponseDto } from './dto/update-author.dto';
import { DeleteAuthorDto, DeleteAuthorResponseDto } from './dto/delete-author.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { GetAuthorResponseDto } from './dto/get-author.dto';
import { FindAuthorResponseDto } from './dto/find-author.dto';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteAuthorCommand } from './commands/delete-author/delete-author.command';
import { Author } from '@prisma/client';

@Controller('author')
export class AuthorController {
    constructor(
        private readonly authorRepository: AuthorRepository,
        private readonly commandBus: CommandBus,
    ) {}

    @Get('')
    async find(): Promise<FindAuthorResponseDto> {
        return this.authorRepository.find();
    }
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<GetAuthorResponseDto> {
        const author = await this.authorRepository.getById(id);

        if (!author) throw new BadRequestException('Автор не найден');

        return author;
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    async create(@Body() dto: CreateAuthorDto): Promise<CreateAuthorResponseDto> {
        return this.authorRepository.create(dto);
    }

    @UseGuards(AccessTokenGuard)
    @Put('')
    async update(@Body() dto: UpdateAuthorDto): Promise<UpdateAuthorResponseDto> {
        return this.authorRepository.updateById(dto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete('')
    async delete(@Body() { uuid }: DeleteAuthorDto): Promise<DeleteAuthorResponseDto> {
        return this.commandBus.execute<DeleteAuthorCommand, Pick<Author, 'uuid'>>(new DeleteAuthorCommand(uuid));
    }
}
