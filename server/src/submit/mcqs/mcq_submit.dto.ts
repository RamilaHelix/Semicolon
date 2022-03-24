import { IsNotEmpty } from "class-validator";

export class McqSubmitDto {
    @IsNotEmpty()
    mcq_id: string;

    @IsNotEmpty()
    answer: string;

    @IsNotEmpty()
    candidate_id: string;

    @IsNotEmpty()
    contest_id: string;
}
