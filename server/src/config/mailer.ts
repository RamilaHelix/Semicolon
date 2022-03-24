import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const mailerConfig = MailerModule.forRoot({
  transport: {
    port: 587,
    secure: false,
    requireTLS: true,
    host: "smtp.gmail.com",
    auth: {
      user: "ramila.testing@gmail.com",
      pass: "Ramila@Helix99",
    },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: process.cwd() + '/templates',
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
});
