import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SubmitProgramService } from './submit.service';
import { CreateSubmitDto } from './dto/create_submit.dto';
import { ProgramsSubmitDto } from './dto/programs-submit.dto';

@Controller('submit')
export class SubmitProgramController {
  constructor(private readonly submitService: SubmitProgramService) { }

  @Post('run')
  create(@Body() createSubmitDto: CreateSubmitDto) {
    return this.submitService.runScript(createSubmitDto);
  }
  @Post('program')
  submitFinal(@Body() createSubmitDto: CreateSubmitDto) {
    return this.submitService.submit(createSubmitDto);
  }

  @Post('programs')
  submitFinals(@Body() createSubmitDto: ProgramsSubmitDto) {
    return this.submitService.submitPrograms(createSubmitDto);
  }


}
