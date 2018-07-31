import pg from "pg";
let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

let createTables = function(){
    createUsersTable();
    createEntriesTable();
    createNotificationsTable();
};

function createUsersTable(){
    pool.connect((err, client, done)=>{
        if(err){
            // eslint-disable-next-line
            console.log(err);
            done();
        }

        client.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL NOT NULL PRIMARY KEY,
            firstname VARCHAR(30),
            lastname VARCHAR(30),
            email VARCHAR(50),
            password VARCHAR(40)
        )`);
    });
}

function createEntriesTable(){
    pool.connect((err, client, done)=>{
        if(err){
            // eslint-disable-next-line
            console.log(err);
            done();
        }

        client.query(`CREATE TABLE IF NOT EXISTS entries (
            id SERIAL NOT NULL PRIMARY KEY,
            userid BIGINT,
            title VARCHAR(300),
            body VARCHAR(1000),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated BOOLEAN NOT NULL DEFAULT FAlSE
        )`);
    });
}

function createNotificationsTable(){
    pool.connect((err, client, done)=>{
        if(err){
            // eslint-disable-next-line
            console.log(err);
            done();
        }
    
        client.query(`CREATE TABLE  IF NOT EXISTS notifications (
            id SERIAL NOT NULL PRIMARY KEY,
            userid BIGINT,
            title VARCHAR(300),
            body VARCHAR(1000),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated BOOLEAN NOT NULL DEFAULT FALSE
        )`);
    });
}

export {createTables};