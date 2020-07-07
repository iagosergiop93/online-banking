import { Pool } from "mysql";
import { getPool } from "./db-config";

export class Container {

    dependencies: any = {};
    factories: any = {};

    constructor(maxNumOfConn?: number) {
        this.dependencies["pool"] = this.getDbPool(maxNumOfConn);
    }

    registerDependencies(arr: Function[]) {
        arr.map(item => {
            this.factories[item.name.toLowerCase()] = item;
        });
    }

    getFunDependencies(fun: Function): any[] {
        if(!fun) throw new Error("An empty function was passed");
        let funName = fun.name.toLowerCase();
        console.log("Getting dependencies of: " + funName);
        if(!!this.dependencies[funName]) return this.dependencies[funName];

        let args = this.getFunArgs(fun);
        console.log("Arguments: " + args + "  " + args.length);

        if(args.length > 0) {
            var deps = [];
            for(let i=0; i < args.length;i++) {
                if(!!this.dependencies[args[i]]) {
                    deps.push(this.dependencies[args[i]]);
                }
                else {
                    let newDeps = this.getFunDependencies(this.factories[args[i]]);
                    let aux = new this.factories[args[i]](...newDeps);
                    deps.push(aux);
                }
            }
            return deps;
        }
        else {
            this.dependencies[funName] = fun.apply(fun, []);
            return this.dependencies[funName];
        }
    }

    private getFunArgs(fun: Function) {
        let str = fun.toString();
        return str.substring(str.indexOf('(')+1, str.indexOf(')')).split(',')
                .map(item => {
                    let idx = item.indexOf(':'); // in case the type is in the dependency
                    if( idx != -1) return item.substring(0, idx).trim().toLowerCase();
                    else return item.trim().toLowerCase();
                });
    }

    getDbPool(numConnections?: number): Pool {
        if(numConnections && numConnections > 0) return getPool(numConnections);
        else return getPool();
    }

}