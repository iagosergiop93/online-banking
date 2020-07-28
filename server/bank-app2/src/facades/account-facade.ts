import { AccountType } from "../entities/Account";
import { createAccountUUID } from "../utils/randomNumGen";
import { Account } from "../entities/Account";

export function createAccountFacade(type: AccountType) {
    let accNumber = createAccountUUID();
    return new Account(0, accNumber, 0.0, type);
}