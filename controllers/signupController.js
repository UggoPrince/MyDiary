import jwt from "jsonwebtoken";
import Users from "../models/users";

function signup(req, res){
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let userData = [fname, lname, email, password];

    // eslint-disable-next-line
    
    if(fname == "" || fname == "undefined"){
        res.status(404).send({"Error": "Firstname is not valid"});
    }
    else if(lname == "" || lname == "undefined"){
        res.status(404).json({"Error": "Lastname is not valid"});
    }
    else if(email == "" || email == "undefined"){
        res.status(404).json({"Error": "Invalid email"});
    }
    else if(password.length < 8){
        res.status(404).json({"Error": "Password should be more than 8."});
    }
    else{
        let user = new Users();
        let emailArr = user.checkUser(email);
        if(emailArr && emailArr[0].password == password){
            res.status(404).json({"Error": "Email already exist. kindly sign in."});
        }
        else{
            let signupResult = user.signupUser(userData);
            if(signupResult){
                const token = jwt.sign({email: email}, email, {expiresIn: 120});
                res.status(200).json({auth:true, token: token});
            }
        }
    }
}

export default signup;