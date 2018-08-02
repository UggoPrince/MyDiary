import db from "./database";

class User{
    constructor(){
        this.db = db;
        this.user = null;
    }

    async checkUser(query, data){
        let check = await this.db.query(query, [data]);
        return check.rowCount;
    }

    async signupUser(query, userData){
        let data = await this.db.query(query, userData);
        return data.rowCount;
    }

    setUser(userData){
        this.user = userData;
    }

    async getUser(query, email){
        let user = await this.db.query(query, email);
            return user.rows[0];
    }
}

export default new User();
