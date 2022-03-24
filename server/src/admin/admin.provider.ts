import { Admin } from '../entities/admin';

export const AdminProviders = [
  {
    provide: 'Admin_REPOSITORY',
    useValue: Admin,
  },
];
