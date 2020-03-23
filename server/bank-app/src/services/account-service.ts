import { AccountType } from "../entities/AccountType";
import { User } from "../entities/User";
import { Account } from "../entities/Account";
import { getConnection } from "typeorm";

export class AccountService {

	constructor() { }

	async createAccount(user: User, accType: AccountType) : Promise<Account> {
		return await getConnection().transaction(async (transactionEntityManager) => {
			let acc = new Account();
			if(accType) acc.type = accType;

			try {
				acc = await transactionEntityManager.save(acc);
				if(!acc) transactionEntityManager.queryRunner.rollbackTransaction();
				if(user.accounts) user.accounts.push(acc);
				return acc;

			} catch(e) {
				console.log(e);
				transactionEntityManager.queryRunner.rollbackTransaction();
				throw new Error();
			}
		});
	}

	async getAccounts(type? : AccountType) : Promise<Account[]> {
		return null;
	}

}