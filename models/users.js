import DataB from "./database";

class Users{
    constructor(){
        this.db = new DataB();
    }

    signupUser(userData){
        let query = "INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *";
        this.db.getQueryDB(query, userData);
    }

    checkUser(email){
        let text = "SELECT email FROM users WHERE email = " + email;
        let result = this.db.getQueryDB(text);
        return result;
    }

    getUser(){}
}

export default Users;