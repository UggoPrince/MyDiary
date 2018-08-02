import jwt from "jsonwebtoken";
import user from "../models/User";
import validateSignUp from "../../helpers/signupHelpers";
import validateSignIn from "../../helpers/signinHelpers";
import {tokenStatus, verifyToken} from "../../helpers/allHelpers";
import createTables from "../models/tables";

createTables();

class UsersController{
    constructor(){
    }

    async signUp(req, res){
        // eslint-disable-next-line
        let fname = req.body.firstname;
        let lname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.password;
        
        let userData = {
            "firstname": fname, 
            "lastname": lname, 
            "email": email, 
            "password": password
        };

        // eslint-disable-next-line
        let valid = validateSignUp(userData);

        if(valid.error){
            res.status(404).json(valid);
        }
        else{
            let userExist = await user.checkUser("SELECT * FROM users WHERE email = ($1)", userData.email);
            if(userExist > 0){
                res.status(409).json({"Error": "Email already exist. kindly sign in."});
            }
            else{
                let regUser = await user.signupUser("INSERT INTO users(firstname, lastname, email, password) values($1, $2, $3, $4)",
                                        [userData.firstname, userData.lastname, userData.email, userData.password]);
                if(regUser == 1){
                    user.setUser(userData);
                    let getUser = await user.getUser("SELECT * FROM users WHERE email = ($1)", [userData.email]);
                    const token = jwt.sign({"userToken": getUser}, "emailsecret", {expiresIn: 2400});// eslint-disable-next-line
                    res.status(201).json({auth:true, token: token});
                }
            }
        }
    }

    async signIn(req, res){
        let email = req.body.email;
        let password = req.body.password;
        let sentToken = req.body.token || req.headers["authentication"];

        let loginData = {
            "email": email,
            "password": password
        };

        let valid = validateSignIn(loginData);

        if(valid.error){
            res.status(404).json(valid);
        }
        else{
            const nToken = await tokenStatus(sentToken);
            if(nToken === "not empty"){
                const myToken = await verifyToken(sentToken).
                        then((decode)=>{
                            return decode;
                        }).catch((err)=>{
                            return err;
                        });
                if(!myToken.name == "JsonWebTokenError" || !myToken.expiredAt){
                    if(myToken.userToken.email === email && myToken.userToken.password === password)
                        res.status(200).json({auth:true, message: "user is still authenticated"});
                }
                else{
                    UsersController.freshLogin(res, loginData, email, password);
                }
            }
            else{
                UsersController.freshLogin(res, loginData, email, password);
            }
        }
    }

    static async freshLogin(res, loginData, email, password){
        let userExist = await user.checkUser("SELECT * FROM users WHERE email = ($1)", loginData.email);
        if(userExist > 0){
            let deUser = await user.getUser("SELECT * FROM users WHERE email = ($1)", [loginData.email]);
            if(deUser.email == email && deUser.password == password){
                const newtoken = jwt.sign({"userToken": deUser}, "emailsecret", {expiresIn: 2400});
                res.status(201).json({auth:true, token: newtoken});
            }
            else{
                res.status(404).json({"Error": "Invalid Email/Password"});
            }
        }
    }
}

let authenticate = new UsersController();

export {authenticate};