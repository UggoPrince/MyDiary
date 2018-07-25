import {Pool} from "pg";
import config from "./config";

class Database{
    constructor(){
        this.pool = this.connentDB();
    }

    connentDB(){
        return new Pool(config);
    }

    queryDB(){
        this.pool.query();
    }
}

export default Database;