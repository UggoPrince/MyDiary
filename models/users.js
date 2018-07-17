class Users{
    constructor(){
        this.allUsers = this.getUsers();
        this.user = null;
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

    getUser(){
        return this.user;
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
            }
        ];
        return users;
    }
}

export default Users;