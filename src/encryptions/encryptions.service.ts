import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionsService {
  saltRounds: number = 10;

  async hash(inputString: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(inputString, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
