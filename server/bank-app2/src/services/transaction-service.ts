import { Transaction, TransactionType } from "../entities/Transaction";
import { Principal } from "../entities/Principal";
import { AccountDao } from "../daos/account-dao";
import { TransactionDao } from "../daos/transaction-dao";
import { Account } from "../entities/Account";
import { BadRequest } from "../exceptions/bad-request";

export class TransactionService {

    accountDao: AccountDao;
    transactionDao: TransactionDao;

    constructor(accountDao: AccountDao, transactionDao: TransactionDao) {
        this.accountDao = accountDao;
        this.transactionDao = transactionDao;
    }

    async getTransactionsByAccountNumber(accountNumber: string): Promise<Transaction[]> {
        let transactions: Transaction[] = []
        try {
            transactions = await this.transactionDao.getByAccountNumber(accountNumber);
        } catch(e) {
            throw e;
        }

        return transactions;
    }

    async simpleTransaction(transaction: Transaction, principal: Principal): Promise<boolean> {
        try {
            let account = await this.checkIfAccountBelongToUser(principal.id, transaction.toAcc);
            // Process transaction
            account = this.processSimpleTransaction(transaction, account);
            account = await this.transactionDao.insert(transaction, account);
        } catch(e) {
            throw e;
        }

        return true;
    }

    async transfer(transaction: Transaction, principal: Principal): Promise<boolean> {
        try {
            let fromAcc = await this.checkIfAccountBelongToUser(principal.id, transaction.fromAcc);
            let toAcc = await this.accountDao.getByAccountNumber(transaction.toAcc);
            // Process transaction
            this.processTransferTransaction(transaction, fromAcc, toAcc);
            
        } catch(e) {
            throw e;
        }
        
        return true;
    }

    private async checkIfAccountBelongToUser(userId: number, accNumber: string): Promise<Account> {
        let account;
        try {
            let accounts = await this.accountDao.getAccountsByUserId(userId);
            account = accounts.filter(acc => {
                return accNumber == acc.accountNumber;
            }).pop();
            if(!account) throw new BadRequest("Invalid Request");
        } catch(e) {
            throw e;
        }

        return account;
    }

    private processSimpleTransaction(transaction: Transaction, account: Account) {
        switch(transaction.type) {
            case TransactionType.DEPOSIT:
                account.balance = account.balance + transaction.value;
                break;
            case TransactionType.WITHDRAW:
                account.balance -= transaction.value;
                break;
            default:
                throw new BadRequest("Invalid request");
        }

        return account;
    }

    private processTransferTransaction(transaction: Transaction, fromAcc: Account, toAcc: Account) {
        return;
    }

    Factory(): TransactionService {
        const accountDao: AccountDao = AccountDao.prototype.Factory();
        const transactionDao: TransactionDao = TransactionDao.prototype.Factory();

        return new TransactionService(accountDao, transactionDao);
    }

}