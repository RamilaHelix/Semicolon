import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/entities';

export const databaseProviders = TypeOrmModule.forRoot({
  type: 'mysql',
  port: 3306,
  host: 'semicolon-v1.corrdto9zxau.ap-south-1.rds.amazonaws.com',
  username: 'admin',
  password: 'Helixstack#semicolon',
  database: 'semicolon',
  // host: process.env.DATABASE_HOST,
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  entities,
  synchronize: false,
  logging: true,
  cache: true,
  logger: 'advanced-console',
});
