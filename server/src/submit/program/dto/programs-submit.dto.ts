import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CreateSubmitDto } from "./create_submit.dto";

export class ProgramsSubmitDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSubmitDto)
    progs: Array<CreateSubmitDto>;
}
