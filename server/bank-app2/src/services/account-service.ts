import { Account, AccountType } from "../entities/Account";
import { insertAccount, getAccountsByUserId, linkUserToAccount } from "../daos/account-dao";
import { createAccountFacade } from "../facades/account-facade";
import { startTransaction, commitQuery, getPoolConnection, releaseConnection } from "../daos/queryMaker";
import { Connection, PoolConnection } from "mysql";
import { Logger } from "pino";
import { getPinoLogger } from "../utils/logger";

export class AccountService {

    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    async createAccount(type: AccountType, userId: number): Promise<Account> {
        this.logger.debug("In accountService createAccount(" + type + ", " + userId + ")");

        let account = createAccountFacade(type);
        let conn: PoolConnection;
        try {
            conn = await startTransaction();
            account = await insertAccount(conn, account);
            await linkUserToAccount(conn, userId, account.accountNumber);
            commitQuery(conn);
        } catch(e) {
            console.log(e);
            
            if(!!conn) {
                conn.rollback();
            }
            throw e;
        } finally {
            if(!!conn) releaseConnection(conn);
        }
        return account;
    }

    async getAccountsByUserId(id: number): Promise<Account[]> {
        let accounts: Account[] = [];
        let conn: PoolConnection;
        try {
            conn = await getPoolConnection();
            accounts = await getAccountsByUserId(conn, id);
        } catch(e) {
            throw e;
        } finally {
            if(!!conn) releaseConnection(conn);
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

    Factory(log?: Logger): AccountService {
        const logger = !!log ? log : getPinoLogger();
        return new AccountService(logger);
    }

}