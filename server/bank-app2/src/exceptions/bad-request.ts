import { BaseError } from "./base-error";

export class BadRequest extends BaseError {

    constructor(msg: string) {
        super(msg);
        this.description = msg;
        this.status = 400;
    }

}