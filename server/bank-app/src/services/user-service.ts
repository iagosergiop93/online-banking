import { User } from "../entities/User";
import { Connection, getRepository, getConnection } from "typeorm";
import { Account } from "../entities/Account";
import { Principal } from "../entities/Principal";

export class UserService {

	constructor() {

	}

	loginService(email: string, passwd: string) : Promise<Principal> {
		
		return new Promise<Principal>((resolve, reject) => {
			if(!email || !passwd) reject(null);
			getRepository(User).createQueryBuilder()
						.where("email = :email", { email: email })
						.andWhere("passwd = :passwd", { passwd: passwd })
						.getOne()
			.then(user => {
				if(!user) reject(null);
				else resolve(new Principal(user.id, user.firstName, user.email, user.role));
			}).catch(err => {
				console.log(err);
				reject("Some error happened in loginService.");
			});
		})
	}

	async registerService(user: User) : Promise<User> {
		return await getConnection().transaction(async (transactionalEntityManager) => {
			try {
				let account = new Account();
				account = await transactionalEntityManager.save(account);
				if(!account) transactionalEntityManager.queryRunner.rollbackTransaction();
				user.accounts = [account];
				user = await transactionalEntityManager.save(user);
				if(!user) transactionalEntityManager.queryRunner.rollbackTransaction();
				return user;
				
			} catch(e) {
				console.log("Rollback in catch");
				transactionalEntityManager.queryRunner.rollbackTransaction();
				throw new Error("This user couldn't be added.");
			}
		})

	}

}