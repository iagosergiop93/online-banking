import { UserService } from "../services/user-service";
import { AccountService } from "../services/account-service";
import { TransactionService } from "../services/transaction-service";
import { UserDao } from "../daos/user-dao";
import { AccountDao } from "../daos/account-dao";
import { TransactionDao } from "../daos/transaction-dao";
import { Container } from "./container";

const deps = [
    UserDao,
    AccountDao,
    TransactionDao,
    UserService,
    AccountService,
    TransactionService
]

const depsTest = [
    UserDao
]

export function initializeContainer() {
    let container = new Container(deps);
    console.log("container", container)
    return container;
}