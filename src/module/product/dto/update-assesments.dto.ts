import { createZodDto } from 'nestjs-zod';
import { UpdateAssessmentsCommand } from '@libs/contracts/commands';

export class UpdateAssessmentsDto extends createZodDto(UpdateAssessmentsCommand.RequestSchema) {}
export class UpdateAssessmentsResponseDto extends createZodDto(UpdateAssessmentsCommand.ResponseSchema) {}
