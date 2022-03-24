import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateCandidateDto } from './create_candidate.dto';

export class CreateBulkCandidate {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCandidateDto)
  candidates: Array<CreateCandidateDto>;
}
