import { Role } from "./user";

export class Principal {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	_createdAt: string;
	_updatedAt: string;
	_deletedAt: string;

	constructor(id?: number, firstName?: string, lastName?: string, email?: string, role?: Role) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role = role
	}
	
}

export class RegisterUserForm {
	firstName: string;
	lastName: string;
	email: string;
	passwd: string;

	constructor(firstName: string, lastName: string, email: string, passwd: string) {
		this.email = email;
		this.passwd = passwd;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}