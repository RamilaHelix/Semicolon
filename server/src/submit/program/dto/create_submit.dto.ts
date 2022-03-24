import { IsNotEmpty } from "class-validator";

export class CreateSubmitDto {

    @IsNotEmpty()
    script: string;

    @IsNotEmpty()
    contest_id: string;

    @IsNotEmpty()
    prog_id: string;

    @IsNotEmpty()
    candidate_id: string;

    @IsNotEmpty()
    language: 'c' | 'cpp' | 'python' | 'javascript' | 'java';

    @IsNotEmpty()
    testCases: Array<testcases>
}
class testcases {
    input: string;
    output: string;
    points: number;
    hidden: boolean;
}