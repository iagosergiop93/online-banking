import { randomBytes } from "crypto";

const numOfBytes = 7

export function createAccountUUID() {
    let buf = randomBytes(numOfBytes);
    return parseInt(buf.toString('hex'), 16).toString().substr(0, 10);
}
