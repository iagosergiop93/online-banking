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

    processTransaction(transaction: Transaction, account: Account) {
        switch(transaction.type) {
            case TransactionType.DEPOSIT:
                account.balance += transaction.value;
                break;
            case TransactionType.WITHDRAW:
                account.balance -= transaction.value;
                break;
            case TransactionType.TRANSFER:
                break;
        }
        return account;
    }

    async deposit(transaction: Transaction, principal: Principal): Promise<boolean> {
        let accounts: Account[] = null;

        try {
            // Check if account belongs to user who is making the deposit
            accounts = await this.accountDao.getAccountsByUserId(principal.id);
            let account = accounts.filter(acc => {
                return transaction.toAcc == acc.accountNumber;
            }).pop();
            if(!account) throw new BadRequest("Invalid Request");
            // Make the deposit
            account = await this.transactionDao.insert(transaction, account);
        } catch(e) {
            throw e;
        }

        return true;
    }

    async withdraw(transaction: Transaction, principal: Principal) {

    }

    async transfer(transaction: Transaction, principal: Principal) {
        
    }

}