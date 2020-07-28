import { User } from "../entities/User";
import { insertUser, getByEmail } from "../daos/user-dao";
import { createHash, comparePassWithHash } from "../utils/secure";
import { BadRequest } from "../exceptions/bad-request";
import { ServerError } from "../exceptions/server-error";
import { getPoolConnection, startTransaction, commitQuery, releaseConnection } from "../daos/queryMaker";
import { insertAccount, linkUserToAccount } from "../daos/account-dao";
import { createAccountFacade } from "../facades/account-facade";
import { AccountType } from "../entities/Account";
import { PoolConnection } from "mysql";

export class UserService {

    constructor() {}

    async login(email: string, passwd: string): Promise<User> {
        console.log("In login service");
        let user: User;
        let conn: PoolConnection;
        try {
            conn = await getPoolConnection();
            user = await getByEmail(conn, email);
            // Compare passwd
            let valid = await comparePassWithHash(passwd, user.passwd);
            if(!valid) throw new BadRequest("User not found.");
            user.passwd = "";
        } catch(e) {
            throw e;
        } finally {
            if(!!conn) releaseConnection(conn);
        }

        return user;
    }

    async registerUser(user: User): Promise<User> {
        console.log("In register service");
        let newUser: User;
        let conn: PoolConnection;
        try {
            user.passwd = await createHash(user.passwd);
            conn = await startTransaction();
            
            // Create User
            newUser = await insertUser(conn, user);
            if(!newUser.id || newUser.id == 0) throw new ServerError("Failed to create user");

            // Create Account
            let account = createAccountFacade(AccountType.CHECKING);
            account = await insertAccount(conn, account);

            // Link User to Account
            await linkUserToAccount(conn, newUser.id, account.accountNumber);

            commitQuery(conn);
            releaseConnection(conn);

            newUser.passwd = "";
        } catch(e) {
            console.log("Service catch");
            return Promise.reject(e);
        } finally {
            if(!!conn) conn.release();
        }

        return newUser;
    }

    Factory() {
        return new UserService();
    }
}