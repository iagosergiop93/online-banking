import { Account, AccountType } from "../entities/Account";
import { AccountDao } from "../daos/account-dao";
import { createAccountUUID } from "../utils/randomNumGen";

export class AccountService {

    private accountDao: AccountDao;

    constructor(accountDao: AccountDao) {
        this.accountDao = accountDao;
    }

    async createAccount(userId: number, type: AccountType): Promise<Account> {
        let accNumber = createAccountUUID();
        let account = new Account(0, accNumber, 0.0, type);
        try {
            account = await this.accountDao.insert(account);
        } catch(e) {
            throw e;
        }
        return account;
    }

    async getAccountsByUserId(id: number): Promise<Account[]> {
        let accounts: Account[] = [];
        try {
            accounts = await this.accountDao.getAccountsByUserId(id);
        } catch(e) {
            throw e;
        }
        return accounts;
    }

    async matchAccountByUserId(accNumber: string, id: number): Promise<boolean> {
        let match = false;
        try {
            let accounts = await this.getAccountsByUserId(id);
            accounts.forEach(acc => {
                if(acc.accountNumber === accNumber) match = true;
            });
        } catch(e) {
            throw e;
        }
        return match;
    }

    Factory(): AccountService {
        const accountDao = AccountDao.prototype.Factory();
        return new AccountService(accountDao);
    }

}