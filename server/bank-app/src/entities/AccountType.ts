import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class AccountType {

	@PrimaryColumn()
	id: number;

	@Column({ unique: true })
	name: string;
}