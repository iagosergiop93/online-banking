import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { type } from "os";
import { AccountType } from "./AccountType";

@Entity()
export class Account {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "double", default: 0.0 })
	balance: number;

	@ManyToOne(type => AccountType, { cascade: true })
	@JoinColumn({
		name: "type",
		referencedColumnName: "id"
	})
	@Column({ default: 1 })
	type: AccountType;

	constructor(type? : AccountType) {
		this.type = type;
	}

}