import { Account } from "./Account";

export enum Role {
	USER = 1, MANAGER = 2, DEV = 3
}

export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwd: string;
    role: Role;
    accounts: Account[] = [];
    _createdAt: string;
	_updatedAt: string;
	_deletedAt: string;

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, passwd?: string, role?: Role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwd = passwd;
        this.role = role;
    }

}
