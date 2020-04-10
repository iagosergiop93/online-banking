import { Role } from "./Role";
import { Account } from "./Account";

export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwd: string;
    role: Role;
    accounts: Account[] = [];

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, passwd?: string, role?: Role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwd = passwd;
        this.role = role;
    }

}
