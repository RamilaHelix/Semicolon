import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { CreateMcqDto } from 'src/types/mcqs/dto/create_mcq.dto';
import { CreateProgramDto } from 'src/types/programs/dto/create_program.dto';

export class CreateTestDto {
  @IsNotEmpty()
  admin_id: string;
  name: string;
  @IsNumber()
  // @Min(30)
  duration: number;
}

export class CreateContest {
  @IsNotEmpty()
  admin_id: string;

  name: string;

  @IsNumber()
  @Min(30)
  duration: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramDto)
  programs: Array<CreateProgramDto>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMcqDto)
  mcqs: Array<CreateMcqDto>;
}
