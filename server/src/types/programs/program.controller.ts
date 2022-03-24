import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBulkProgram } from './dto/bulk_create_program.dto';
import { CreateProgramDto, ProgramResponseDto } from './dto/create_program.dto';
import { ProgramService } from './program.service';

@Controller()
export class ProgramController {
  constructor(private readonly progService: ProgramService) { }

  @Post('/add1')
  async addProg(@Body() prog: CreateProgramDto) {
    return this.progService.createProg(prog);

  }

  @Post('add')
  bulkCreate(@Body() createBulkProgram: CreateBulkProgram) {
    console.log(createBulkProgram.programs)
    return this.progService.bulkCreate(createBulkProgram);
  }


  @Get('bycontest/:contest_id')
  async getAllProgramsByContest(
    @Param('contest_id') contest_id: string): Promise<ProgramResponseDto[]> {
    return this.progService.getByContest(contest_id)

  }

  @Delete('delete/:prog_id')
  delete(@Param('prog_id') prog_id: string) {
    return this.progService.deleteById(prog_id);
  }
}
