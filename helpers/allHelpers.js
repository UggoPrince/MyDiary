import jwt from "jsonwebtoken";

export const tokenStatus = (token)=>{
     if(token == "" || token == undefined) return "empty";
    else if(token != "empty" || token != undefined) return "not empty";
};

export const verifyToken = async (token)=>{
    let decoded = await jwt.verify(token, "emailsecret");
    return decoded;
};

export const validID = (id)=>{
    let err = false;

    if(isNaN(id)){
        err = true;
    }
    if(Math.sign(id) == -1){
        err = true;
    }
    if(id == 0){
        err = true;
    }

    return err;
};

export const validEntry = (entry) =>{
    if(entry == "" || entry == undefined) return false;
    else return true;
};
