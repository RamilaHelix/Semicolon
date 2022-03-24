import { IsNotEmpty } from 'class-validator';

export class CreateTestCaseDto {
  testcase_id: string

  @IsNotEmpty()
  input: string;

  @IsNotEmpty()
  output: string;

  @IsNotEmpty()
  points: number;
}

export class TestCaseResponseDto {
  input: string;
  output: string;
  points: number;
  testcase_id: string
}
