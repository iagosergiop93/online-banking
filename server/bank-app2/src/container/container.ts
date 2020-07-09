import { getPool } from "../utils/db-config";

export class Container {

    private singletons: any = {};
    private factories: any = {};

    constructor(dependencies: Function[]) {
        this.singletons["pool"] = getPool();
        this.registerFactories(dependencies);
        this.createSingletons(this.factories);
    }

    private registerFactories(arr: Function[]) {
        arr.map(item => {
            // Function Validation
            if(!item) throw new Error("An empty function was passed");
            this.factories[item.name.toLowerCase().trim()] = item;
        });
    }

    private createSingletons(deps: any) {
        console.log("In createSingletons");
        for (const key in deps) {
            if(!this.singletonExists(key)) {
                this.makeSingletonDependency(key, deps[key]);
            }
        }
    }

    private singletonExists(key: string): boolean {
        return !!this.singletons[key];
    }

    private makeSingletonDependency(key: string, depType: Function): Function {

        if(this.singletonExists(key)) return this.singletons[key];
        
        // Get Function arguments if they exist
        let args = this.getFunctionArguments(depType);

        // Check if Function has arguments
        let deps = [];
        if(args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                deps.push(this.getDependencies(args[i]));
            }
        }
        this.singletons[key] = args.length > 0 ? new this.factories[key](...deps) : new this.factories[key]();
        return this.singletons[key];
    }

    private getFunctionArguments(fun: Function) {
        let str = fun.toString();
        return str.substring(str.indexOf('(')+1, str.indexOf(')')).split(',')
                .map(item => {
                    let idx = item.indexOf(':'); // in case the type is in the dependency
                    if( idx != -1) return item.substring(0, idx).trim().toLowerCase();
                    else return item.trim().toLowerCase();
                });
    }

    private getDependencies(key: string): Function {
        if(!!this.singletons[key]) {
            return this.singletons[key];
        }
        return this.makeSingletonDependency(key, this.factories[key]);
    }

    getSingleton<T extends Function>(dependency: T) {
        return this.singletons[dependency.name.toLowerCase().trim()];
    }

    getPrototype(dependencyName: string) {

    }

}