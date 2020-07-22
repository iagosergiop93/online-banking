import { Credentials } from '../entities/credentials';
import { User } from '../entities/user';
import { Account } from '../entities/account';

export function emailValidator(email: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

export function passwordValidator(passwd: string): boolean {
    if (passwd && passwd.length > 3) {
        return true;
    }
    return false;
}

export function credentialsValidator(cred: Credentials): boolean {
    if(!cred.email || !cred.passwd) return false;
    return emailValidator(cred.email) && passwordValidator(cred.passwd);
}

export function userValidator(user: User): boolean {
    if(!user || !user.id || !emailValidator(user.email)) return false;
    return true;
}

export function accountValidator(account: Account) {
    //TODO
    return true;
}

export function transactionValidator(account: Account) {
    //TODO
    return true;
}