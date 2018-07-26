import {Pool} from "pg";

class Database{
    constructor(){
        this.pool = this.connentDB();
        //this.createTables();
    }

    connentDB(){
        return new Pool("postgres://postgres:admin@localhost:5432/mydiary");
    }

    getQueryDB(queryString){
        this.pool.connect((err, client, done)=>{
            if(err){ // eslint-disable-next-line
                console.log(err);
            }
            client.query(queryString, (err, result)=>{
                done();
                if(err){ // eslint-disable-next-line
                    console.log(err);
                }
                else return result.rows;
            });
        });
    }

    setQueryDB(queryString){
        this.pool.query(queryString);
    }



    /*createTables(){
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
        
        this.setQueryDB(usersTable);
        this.setQueryDB(entriesTable);
        this.setQueryDB(notificationsTable);
    }*/
}

export default Database;