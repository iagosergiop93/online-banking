import { User } from "../entities/User";
import { Account, AccountType } from "../entities/Account";
import { Role } from "../entities/Role";
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


}