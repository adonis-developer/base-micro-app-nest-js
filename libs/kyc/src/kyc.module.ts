import { Module } from '@nestjs/common';

import { EmailService } from './services/email.service';
import { PhoneService } from './services/phone.service';

export const KYC_TYPE_NAME = {
  EMAIL_SERVICE: 'EMAIL_SERVICE ',
  PHONE_SERVICE: 'PHONE_SERVICE',
};

@Module({
  providers: [EmailService, PhoneService],
  exports: [EmailService, PhoneService],
})
export class KycModule {}

export type KycConfig<T> = {
  type: string;
  options: T;
};

export type EmailOptions = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};
