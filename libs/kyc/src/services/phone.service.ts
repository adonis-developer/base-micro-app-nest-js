import { Injectable } from '@nestjs/common';
import { IKycService } from '../interface';

@Injectable()
export class PhoneService implements IKycService<PhonePayload> {
  sendBackUp(payload: PhonePayload): Promise<void> | void {
    console.log('🚀 ~ PhoneService ~ sendBackUp ~ payload:', payload);
    throw new Error('Method not implemented.');
  }

  async send() {
    console.log('send phone');
  }
}

export type PhonePayload = {
  phone: string;
};
