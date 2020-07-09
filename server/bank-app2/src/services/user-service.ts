import { User } from "../entities/User";
import { UserDao } from "../daos/user-dao";
import { createHash, comparePassWithHash } from "../utils/secure";
import { BadRequest } from "../exceptions/bad-request";
import { ServerError } from "../exceptions/server-error";
import { Factory } from "../interfaces/Factory";

export class UserService implements Factory {
    
    private userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    async login(email: string, passwd: string): Promise<User> {
        console.log("In login service");
        let user: User;
        try {
            user = await this.userDao.getByEmail(email);
            // Compare passwd
            let valid = await comparePassWithHash(passwd, user.passwd);
            if(!valid) throw new BadRequest("User not found.");
            user.passwd = "";
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
            newUser = await this.userDao.insert(user);
            newUser.passwd = "";
            if(!newUser.id || newUser.id == 0) throw new ServerError("Failed to create user");
        } catch(e) {
            throw e;
        }

        return newUser;
    }

    Factory() {
        let userDao: UserDao = UserDao.prototype.Factory();
        return new UserService(userDao);
    }   

}