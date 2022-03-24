import { PartialType } from '@nestjs/swagger';
import { CreateMcqDto } from './create_mcq.dto';

export class UpdateMcqDto extends PartialType(CreateMcqDto) { }
