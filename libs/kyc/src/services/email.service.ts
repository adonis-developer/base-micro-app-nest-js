import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IKycService } from '../interface';
import { env } from 'apps/auth-svc/src/configs/environment-variable';

@Injectable()
export class EmailService implements IKycService<EmailPayload> {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.port === 465,
      auth: {
        user: env.email.user,
        pass: env.email.pass,
      },
    });
  }

  async sendBackUp(payload: EmailPayload): Promise<void> {
    console.log('🚀 ~ EmailService ~ sendBackUp ~ payload:', payload);
    throw new Error('Method not implemented.');
  }

  async send({ to, subject, text, html }: EmailPayload) {
    const mailOptions = {
      from: 'Nguyễn Văn Vấn <do-not-reply@ses.nvvan.com>',
      to,
      subject,
      text,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

export type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type KycEmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};
