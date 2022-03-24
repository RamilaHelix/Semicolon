import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { TestCaseResponseDto } from './create_test_case.dto';
import { CreateProgramDto } from './create_program.dto';

export class CreateBulkProgram {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramDto)
  programs: Array<CreateProgramDto>;
}
export class ProgramsResponseDto {
  prog_id: string;
  title: string;
  time: number;
  points: number;
  contest_id: string;
  boilerplateCode: string;
  testcases: Array<TestCaseResponseDto>
}