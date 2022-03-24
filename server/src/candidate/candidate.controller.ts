import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { errorMessage } from 'src/error';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create_candidate.dto';
import { CreateBulkCandidate } from './dto/create_bulk.dto';
import { InviteCandidateDto } from './dto/invite-candidate.dto';
import { VerifyCandidateDto } from './dto/verify-candidate.dto';

@Controller()
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Post('add1')
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Post('add')
  bulkCreate(@Body() createBulkCandidate: CreateBulkCandidate) {
    return this.candidateService.bulkCreate(createBulkCandidate);
  }

  @Get(':pin')
  verifyCandidate(@Param('pin') pin: string) {
    return this.candidateService.verifyCandidate(pin);
  }

  @Get('attempted/:admin_id')
  getCandidateByContest(@Param('admin_id') id: string) {
    return this.candidateService.getCandidateByContest(id)
  }

  @Delete('delete/:candidate_id')
  deleteCandidate(@Param('candidate_id') candidate_id: string) {
    return this.candidateService.delete(candidate_id);
  }

  @Patch('/:candidate_id/:contest_id')
  addContestIDtoCandidate(
    @Param('candidate_id') candidate_id: string,
    @Param('contest_id') contest_id: string) {
    return this.candidateService.updateCandidate(candidate_id, contest_id)
  }

  // @Post('invite')
  // inviteCandidate(
  //   @Body() inviteCandidateDto: InviteCandidateDto,
  //   @Request() req: any,
  // ) {
  //   const { candidate_id, test_id, route } = inviteCandidateDto;
  //   return this.candidateService.invite(
  //     candidate_id,
  //     test_id,
  //     req.headers['origin'],
  //     route,
  //   );
  // }
}
// @Get(':candidate_id/:admin_id')
// findOne(@Param('candidate_id') candidate_id: string,
//   @Param('admin_id') admin_id: string,
// ) {
//   return this.candidateService.findOne(candidate_id, admin_id);
// }
// @Post('verify')
  // verify(@Body() verifyCandidateDto: VerifyCandidateDto) {
  //   return this.candidateService.verifyCandidate(verifyCandidateDto);
  // }