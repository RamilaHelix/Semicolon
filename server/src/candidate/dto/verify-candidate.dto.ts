import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyCandidateDto {
  candidate_id: string;

  @IsNotEmpty()
  pin: string;
}
