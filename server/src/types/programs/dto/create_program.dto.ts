import { IsNotEmpty } from 'class-validator';
import { CreateTestCaseDto } from './create_test_case.dto';

export class CreateProgramDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  contest_id: string;

  @IsNotEmpty()
  boilerplateCodeJS: string;

  @IsNotEmpty()
  testCases: Array<CreateTestCaseDto>;
}
export class ProgramResponseDto {
  prog_id: string;
  title: string;
  time: number;
  contest_id: string;
  boilerplateCodeJS: string;
  testCases: Array<CreateTestCaseDto>;
}
