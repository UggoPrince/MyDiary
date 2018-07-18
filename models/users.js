class Users{
    constructor(){
        this.allUsers = this.getUsers();
    }

    checkUser(id){
        for(let u of this.allUsers){
            if(u.userId == id){
                this.user = u;
                return true;
            }
        }
        return false;
    }

    getUser(id){
        if(id <= this.allUsers.length && id > 0){
            let i = id - 1;
            return this.allUsers[i];
        }
        else{
            return null;
        }
    }

    getUsers(){
        const users = [
            {
                "userId":1,
                "email":"ben@gmail.com",
                "password":"12345678",
                "fisrtname":"Ben",
                "lastname":"Carson"
            },
            {
                "userId":2,
                "email":"joe@gmail.com",
                "password":"12123434",
                "fisrtname":"Joe",
                "lastname":"Ike"
            },
            {
                "userId":3,
                "email":"kerry@gmail.com",
                "password":"454567kk",
                "fisrtname":"Kerry",
                "lastname":"Hilson"
            },
            {
                "userId":4,
                "email":"uzochukwu@gmail.com",
                "password":"uzohjkl",
                "fisrtname":"Uzochukwu",
                "lastname":"Okoro"
            },
            {
                "userId":5,
                "email":"tochi@gmail.com",
                "password":"tochi556",
                "fisrtname":"Tochi",
                "lastname":"Kenedy"
            }
        ];
        return users;
    }
}

export default Users;