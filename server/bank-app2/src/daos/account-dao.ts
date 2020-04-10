import { DAO } from "./DAO-interface";
import { Account } from "../entities/Account";
import { Pool } from "mysql";

export class AccountDao implements DAO<Account> {

    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    getAll(): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    insert(obj: Account): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    update(obj: Account): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<Account> {
        throw new Error("Method not implemented.");
    }

}