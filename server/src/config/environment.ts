import { ConfigModule } from '@nestjs/config';

export const envConfig = ConfigModule.forRoot({
    envFilePath: '.development.env',
});
