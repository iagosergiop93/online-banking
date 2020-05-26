import { Injectable } from '@angular/core';

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
}
