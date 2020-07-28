import { Account, AccountType } from "../entities/Account";
import { insertAccount, getAccountsByUserId } from "../daos/account-dao";
import { createAccountFacade } from "../facades/account-facade";
import { startTransaction, commitQuery, getPoolConnection } from "../daos/queryMaker";

export class AccountService {

    constructor() {}

    async createAccount(type: AccountType): Promise<Account> {
        let account = createAccountFacade(type);
        try {
            let conn = await startTransaction();
            account = await insertAccount(conn, account);
            commitQuery(conn);
        } catch(e) {
            throw e;
        }
        return account;
    }

    async getAccountsByUserId(id: number): Promise<Account[]> {
        let accounts: Account[] = [];
        try {
            let conn = await getPoolConnection();
            accounts = await getAccountsByUserId(conn, id);
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
        return new AccountService();
    }

}