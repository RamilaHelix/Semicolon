import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create_candidate.dto';
import { Candidate } from '../entities/candidate';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateBulkCandidate } from './dto/create_bulk.dto';
import { SubmitProgram } from 'src/entities/submit-program.entity';

@Injectable()
export class CandidateService {

  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private readonly mailerService: MailerService,
    @InjectRepository(SubmitProgram)
    private submitProgramRepository: Repository<SubmitProgram>
  ) { }

  create(createCandidateDto: any) {
    const createCandidateWithId = {
      ...createCandidateDto,
      candidate_id: uuid.v4(),
      pin: Math.floor(100000 + Math.random() * 900000),
    };
    if (!createCandidateDto.email && createCandidateDto.email !== '')
      return errorMessage('BAD_REQUEST', 'Email is required');
    return this.candidateRepository
      .save(createCandidateWithId)
      .then((res) => {
        return this.mailerService
          .sendMail({
            to: res.email,
            from: 'noreply@helixstack.in',
            subject: 'Helix Contest Invitation',
            template: 'newcandidate',
            context: {
              name: res.name,
              pin: res.pin,
            },
          })
          .then((resMail) => {
            return { messageId: resMail.messageId };
          })
          .catch(resErr => errorMessage('REQUEST_TIMEOUT', resErr));
      })
      .catch(resErr => errorMessage('NOT_ACCEPTABLE', 'candidate already exist'));

  }

  verifyCandidate(pin: string) {
    if (!pin && pin !== '')
      return errorMessage(
        'BAD_REQUEST',
        'pin is required!',
      );
    return this.candidateRepository
      .findOne({ where: { pin } })
      .then((candidate) => {
        if (candidate)
          if (!candidate.attempted) {
            return this.candidateRepository.update({ candidate_id: candidate.candidate_id },
              { attempted: true, pin: null }).then(() => { return { candidate } })
          }
        throw ({ error: 'Pin Not Found ..!' })
      })
      .catch((error) => {
        return error;
      });

  }
  async getCandidateByContest(admin_id: string): Promise<any[]> {
    try {
      const candidates = await this.candidateRepository.find({ admin_id, attempted: true })

      const arr = candidates.map(async (candidate) => {
        const res = await this.submitProgramRepository.findOne({ candidate_id: candidate.candidate_id });
        return { ...res, ...candidate }
      })
      return Promise.all(arr)

    } catch (error) {
      return error;
    }
  }
  // verifyCandidate(verifyCandidate: UpdateCandidateDto) {
  //   return this.candidateRepository
  //     .findOne({ where: { email: verifyCandidate.email } })
  //     .then((res) => {
  //       if (res && res.pin) {
  //         return this.candidateRepository
  //           .update({ email: res.email }, { pin: null })
  //           .then((res) => res)
  //           .catch((err) => err);
  //       } else {
  //         return errorMessage('NOT_FOUND', 'Pin is invalid');
  //       }
  //     });
  // }

  // findOne(candidate_id: string, admin_id: string) {
  //   if (!candidate_id && candidate_id !== '' && !admin_id && admin_id !== '')
  //     return errorMessage(
  //       'BAD_REQUEST',
  //       'candidate_id and admin_id is required!',
  //     );
  //   return this.candidateRepository
  //     .findOne({ where: { candidate_id: candidate_id, admin_id: admin_id } })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }
  delete(candidate_id: string) {
    if (!candidate_id && candidate_id !== '')
      return errorMessage('BAD_REQUEST', 'candidate_id is required!');
    return this.candidateRepository
      .delete({ candidate_id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async bulkCreate(createBulkCandidate: CreateBulkCandidate) {
    const resArray = [];
    for (let i = 0; i < createBulkCandidate.candidates.length; i++) {
      try {
        const resPin = await this.candidateRepository.save({
          ...createBulkCandidate.candidates[i],
          candidate_id: uuid.v4(),
          pin: Math.floor(100000 + Math.random() * 900000),
        });
        try {
          const resMail = await this.mailerService.sendMail({
            to: resPin.email,
            from: 'hr@helixstack.in',
            subject: 'Helix Contest Invitation',
            template: 'newcandidate',
            context: {
              name: resPin.name,
              pin: resPin.pin,
            },
          });
          resArray.push(resMail);
        } catch (error) {
          resArray.push(error);
        }
      } catch (error) {
        resArray.push(error);
      }
    }
    return resArray;
  }

  updateCandidate(candidate_id: string, contest_id: string) {
    return this.candidateRepository.update({ candidate_id }, { contest_id })
      .then((res) => {
        if (res.affected === 0) {
          return errorMessage('UNAUTHORIZED', 'Check ids');
        }
        return { affected: res.affected };
      })
      .catch((err) => err);
  }
}

// invite(candidate_id: string, test_id: string, origin: string, route: string) {
//   if (!candidate_id && !test_id) {
//     return errorMessage(
//       'BAD_REQUEST',
//       'candidate_id and test_id is required!',
//     );
//   }
//   return this.candidateRepository
//     .findOne({ where: { candidate_id } })
//     .then((res) => {
//       if (res) {
//         return this.inviteRepository
//           .save({
//             candidate_id,
//             test_id,
//             invite_id: uuid.v4(),
//             magic_string: uuid.v4(),
//           })
//           .then((resInvite) => {
//             return this.mailerService
//               .sendMail({
//                 to: res.email,
//                 from: 'noreply@helixstack.in',
//                 subject: 'Helix Contest Invitation',
//                 template: 'invite',
//                 context: {
//                   name: res.name,
//                   link: route
//                     ? `${origin}/${route}/${resInvite.magic_string}`
//                     : `${origin}/${resInvite.magic_string}`,
//                 },
//               })
//               .then((resMail) => {
//                 return {
//                   test_id: resInvite.test_id,
//                   messageId: resMail.messageId,
//                 };
//               })
//               .catch((resErr) => console.log(resErr));
//           })
//           .catch((err) => {
//             return err;
//           });
//       } else {
//         return errorMessage('NOT_FOUND', 'Something went wrong!');
//       }
//     });
// }
