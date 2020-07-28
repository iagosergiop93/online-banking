import { User } from "../entities/User";
import { insertUser, getByEmail } from "../daos/user-dao";
import { createHash, comparePassWithHash } from "../utils/secure";
import { BadRequest } from "../exceptions/bad-request";
import { ServerError } from "../exceptions/server-error";
import { getPoolConnection, startTransaction, commitQuery, releaseConnection } from "../daos/queryMaker";
import { insertAccount, linkUserToAccount } from "../daos/account-dao";
import { createAccountFacade } from "../facades/account-facade";
import { AccountType } from "../entities/Account";

export class UserService {

    constructor() {}

    async login(email: string, passwd: string): Promise<User> {
        console.log("In login service");
        let user: User;
        try {
            let conn = await getPoolConnection();
            user = await getByEmail(conn, email);
            // Compare passwd
            let valid = await comparePassWithHash(passwd, user.passwd);
            if(!valid) throw new BadRequest("User not found.");
            user.passwd = "";
            releaseConnection(conn)
        } catch(e) {
            throw e;
        }

        return user;
    }

    async registerUser(user: User): Promise<User> {
        console.log("In register service");
        let newUser: User;
        try {
            user.passwd = await createHash(user.passwd);
            let conn = await startTransaction();
            
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
        }

        return newUser;
    }

    Factory() {
        return new UserService();
    }
}