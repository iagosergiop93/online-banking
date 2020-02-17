import { Role } from "./Role";

export class Principal {
	id: number;
	firstName: string;
	email: string;
	role: Role

	constructor(id?: number, firstName?: string, email?: string, role?: Role) {
		this.id = id;
		this.firstName = firstName;
		this.email = email;
		this.role = role
	}
	
}