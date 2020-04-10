import * as bcrypt from "bcrypt";
import config from "../../resources/crypt.json";

export function createHash(word: string): Promise<string> {
    return bcrypt.hash(word, config.saltRounds);
}

export function comparePassWithHash(passwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(passwd, hash);
}