import { Mcq } from '../../entities/mcqs';

export const mcqProviders = [
  {
    provide: 'MCQ_REPOSITORY',
    useValue: Mcq,
  },
];
