import { DAO } from "./DAO-interface";
import { Transaction } from "../entities/Transaction";

export class TransactionDao implements DAO<Transaction> {

    getAll(): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }
    insert(obj: Transaction): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }
    update(obj: Transaction): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }
    
}