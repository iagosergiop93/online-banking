import { Role } from "./Role";
import { Account } from "./Account";

export class Principal {
	id: number;
	firstName: string;
	email: string;
	role: Role;
	accounts: Account[] = [];

	constructor(id?: number, firstName?: string, email?: string, role?: Role) {
		this.id = id;
		this.firstName = firstName;
		this.email = email;
		this.role = role
	}
	
}