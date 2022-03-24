import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { McqSubmitDto } from "./mcq_submit.dto";

export class McqsSubmitDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => McqSubmitDto)
    Mcqs: Array<McqSubmitDto>;
}