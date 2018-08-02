import pg from "pg";

const pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

/*function createTables(){

    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        firstname VARCHAR(30),
        lastname VARCHAR(30),
        email VARCHAR(50),
        password VARCHAR(40)
    )
    CREATE TABLE IF NOT EXISTS entries (
        id SERIAL NOT NULL PRIMARY KEY,
        userid BIGINT,
        title VARCHAR(300),
        body VARCHAR(1000) NOT NULL,
        created_at VARCHAR(20) NOT NULL,
        updated_at VARCHAR(20),
        updated BOOLEAN DEFAULT FALSE
    )
    CREATE TABLE  IF NOT EXISTS notifications (
        id SERIAL NOT NULL PRIMARY KEY,
        userid BIGINT,
        title VARCHAR(300),
        body VARCHAR(1000) NOT NULL,
        created_at VARCHAR(20) NOT NULL,
        updated_at VARCHAR(20)
        updated BOOLEAN DEFAULT FALSE
    )`;

    client.query(query, (err)=>{
        if(err){
            return err.message;
        }
        client.end();
    });
}*/

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
            body VARCHAR(1000) NOT NULL,
            created_at VARCHAR(20) NOT NULL,
            updated_at VARCHAR(20),
            updated BOOLEAN DEFAULT FALSE
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
            body VARCHAR(1000) NOT NULL,
            created_at VARCHAR(20) NOT NULL,
            updated_at VARCHAR(20)
            updated BOOLEAN DEFAULT FALSE
        )`);
    });
}

function createTables(){
    createUsersTable();
    createEntriesTable();
    createNotificationsTable();
}

export default createTables;