import { Role } from "./Role";

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