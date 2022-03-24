import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateMcqDto } from './create_mcq.dto';

export class CreateMcqsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMcqDto)
  mcqs: Array<CreateMcqDto>;
}
