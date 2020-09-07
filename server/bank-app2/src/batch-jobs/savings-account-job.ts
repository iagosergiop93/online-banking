import { getAllAccounts, updateAccount } from '../daos/account-dao';
import { startTransaction, commitQuery } from '../daos/queryMaker';
import { ServerError } from '../exceptions/server-error';
import { Connection } from 'mysql';

export async function savingsAccountUpdate(): Promise<void> {

    let conn: Connection;

    try {
        conn = await startTransaction();
        let accounts = await getAllAccounts(conn);
        accounts.forEach(acc => {
            acc.balance = acc.balance * (1 +acc.interest);
            updateAccount(conn, acc);
        });
        commitQuery(conn);
    } catch (error) {
        conn.rollback();
        throw new ServerError("Something bad happened");
    }

}