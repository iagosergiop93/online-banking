import { Injectable } from '@angular/core';
import { Credentials } from '../entities/credentials';
import { User } from '../entities/user';
import { Account } from '../entities/account';

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

	user(user: User): boolean {
		if(!user || !user.id || !this.email(user.email)) return false;
		return true;
	}

	account(account: Account) {
		//TODO
		return true;
	}

}
