import {Pool} from "pg";
import config from "./config";

class Database{
    constructor(){
        this.pool = this.connentDB();
    }

    connentDB(){
        return new Pool(config);
    }

    queryDB(queryString){
        this.pool.query(queryString, (err, res)=>{
            if(err){
                throw err;
            }
            else{
                return res.rows;
            }
        });
    }

    createTables(){
        const usersTable = `CREATE TABLE IF NOT EXISTS users (
                                id INT PRIMARY KEY, 
                                firstname VARCHAR(20) NOT NULL,
                                lastname VARCHAR(20) NOT NULL,
                                email VARCHAR(40) NOT NULL,
                                password VARCHAR(40) NOT NULL
                            );`;
        const entriesTable = `CREATE TABLE IF NOT EXISTS entries (
                                id INT PRIMARY KEY, 
                                userId INT NOT NULL,
                                title TEXT(300) NOT NULL,
                                body TEXT(1000) NOT NULL,
                                timeCreated DATE NOT NULL,
                                updated BOOLEAN DEFAULT FALSE,
                                timeUpdated DATE
                            );`;
        const notificationsTable = `CREATE TABLE IF NOT EXISTS notifications (
                                id INT PRIMARY KEY, 
                                userId INT NOT NULL,
                                title TEXT(300) NOT NULL,
                                body TEXT(1000) NOT NULL,
                                timeCreated DATE NOT NULL,
                                updated BOOLEAN DEFAULT FALSE,
                                timeUpdated DATE
                            );`;
        
        this.queryDB(usersTable);
        this.queryDB(entriesTable);
        this.queryDB(notificationsTable);
    }
}

export default Database;