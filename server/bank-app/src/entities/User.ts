import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Role } from "./Role";
import { Account } from "./Account";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwd: string;

    @ManyToOne(type => Role, { cascade: true })
    @JoinColumn({
        name: "role",
        referencedColumnName: "id"
    })
    @Column({ default: 1 })
    role: Role;

    @ManyToMany(type => Account, { cascade: true })
    @JoinTable({
        name: "user_account",
        joinColumn: {
            name: "user",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "account",
            referencedColumnName: "id"
        }
    })
    accounts: Account[];

    constructor(firstName?: string, lastName?: string, email?: string, passwd?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwd = passwd;
    }

}
