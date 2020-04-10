
export interface DAO<T> {
    
    getAll(): Promise<Array<T>>;
    getById(id: number): Promise<T>;
    insert(obj: T): Promise<T>;
    update(obj: T): Promise<T>;
    delete(id: number): Promise<T>;

}