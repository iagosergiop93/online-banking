
export enum Role {
	USER = 1, MANAGER = 2, DEV = 3
}

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}