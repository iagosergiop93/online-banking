
export class BaseError extends Error {

    status: number;
    description: string;

    constructor(msg: string) {
        super(msg);
        this.description = msg;
    }

}