import { Program } from '../../entities/programs';

export const progProviders = [
  {
    provide: 'PROG_REPOSITORY',
    useValue: Program,
  },
];
