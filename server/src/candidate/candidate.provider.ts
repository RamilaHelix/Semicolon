import { Candidate } from '../entities/candidate';

export const candidateProviders = [
  {
    provide: 'CANDIDATE_REPOSITORY',
    useValue: Candidate,
  },
  // {
  //   provide: 'INVITE_REPOSITORY',
  //   useValue: Candidate,
  // },
];
