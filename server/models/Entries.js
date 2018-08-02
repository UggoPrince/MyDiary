import db from "./database";

class Entries{
    constructor(){
        this.db = db;
        this.entry = null;
    }

    async getEntries(query, userID){
        let userEntries = await this.db.query(query, [userID]);
        return userEntries;
    }

    async addEntry(query, entry){
        let userEntry = await this.db.query(query, entry);
        return userEntry.rowCount;
    }

    async modifyEntry(query, entry){
        let userEntry = await this.db.query(query, entry);
        return userEntry.rows;
    }
}

export default new Entries();