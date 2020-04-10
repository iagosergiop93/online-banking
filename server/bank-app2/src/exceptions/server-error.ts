import { BaseError } from "./base-error";

export class ServerError extends BaseError {

    constructor(msg: string) {
        super(msg);
        this.description = msg;
        this.status = 500;
    }

}