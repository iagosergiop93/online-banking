import { DAO } from "./DAO-interface";
import { Pool } from "mysql";
import { getPool } from "../utils/db-config";


export class RegisterUserDao implements DAO {
    pool: Pool = getPool();
}