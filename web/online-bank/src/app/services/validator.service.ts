import { Injectable } from '@angular/core';
import { Credentials } from '../entities/credentials';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  email(email: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  password(passwd: string): boolean {
    if (passwd && passwd.length > 3) {
      return true;
    }
    return false;
  }

  credentials(cred: Credentials): boolean {
    if(!cred.email || !cred.passwd) return false;
    return this.email(cred.email) && this.password(cred.passwd);
  }
}
