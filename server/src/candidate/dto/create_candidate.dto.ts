import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  name: string;
  contact: string;
  admin_id: string;
  contest_id: string
}
