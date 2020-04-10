import { User } from "../entities/User";
import { Account } from "../entities/Account";
import { Role } from "../entities/Role";
import { AccountDao } from "../daos/account-dao";

export class AccountService {

    private accountDao: AccountDao;

    constructor(accountDao: AccountDao) {
        this.accountDao = accountDao;
    }

    createAccount(userId: number, type?: Role): Promise<Account> {
        return new Promise((resolve, reject) => {
            resolve(null)
        });
    }


}