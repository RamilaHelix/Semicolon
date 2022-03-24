import { PartialType } from '@nestjs/swagger';
import { CreateCandidateDto } from './create_candidate.dto';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) { }
