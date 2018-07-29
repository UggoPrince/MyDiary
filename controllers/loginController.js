import jwt from "jsonwebtoken";
import pg from "pg";

let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

function login(req, res){
    let email = req.body.email;
    let password = req.body.password;
    let sentToken = req.body.token || req.headers["authentication"];

    let loginData = {
        "email": email,
        "password": password
    };

    if(email == "" || email == "undefined"){
        res.status(404).json({"Error": "Invalid email"});
    }
    else if(password.length < 8){
        res.status(404).json({"Error": "Password should be more than 8."});
    }
    else{
        pool.connect((err, client, done)=>{
            
            if(err){
                // eslint-disable-next-line
                console.log(err);
                res.status(500).json({success:false, data:err});
                done();
            }
            
            let secret = email;
            let decoded;

            doLogin(req, res, loginData, sentToken, secret);
            
            if(sentToken != "" && sentToken != "undefined"){
                //res.json(sentToken);
                jwt.verify(sentToken, email, (err, decode)=>{
                    if(err){
                        decoded = err;
                    }
                    else{
                        decoded = decode;
                    }
                });

                if(decoded.expiredAt){
                    sentToken = "";
                    doLogin(req, res, loginData, sentToken, secret);
                }
                else{
                    if(decoded.userToken){
                        if(decoded.userToken["email"] == email && decoded.userToken.password == password){
                            res.status(200).json({auth:true, message: "user is still authenticated"});
                        }
                    }
                    else { 
                        sentToken = "";
                        doLogin(req, res, loginData, sentToken, secret);
                    }
                }
            }
        });
    }
}

function doLogin(req, res, loginData, sentToken, secret){
    pool.connect((err, client, done)=>{
        if(sentToken == "" || sentToken == "undefined"){
                    
            client.query("SELECT * FROM users WHERE email = ($1)", [loginData.email], (err, result)=>{
                if(err){
                    res.status(500).json({success:false, data:err});
                    done();
                }
                else if(result.rowCount == 0){
                    res.status(404).json({"Error": "Invalid Email/Password"});
                }
                else if(result.rows[0].email == loginData["email"] && result.rows[0].password != loginData["password"] ){
                    res.status(404).json({"Error": "Invalid Email/Password"});
                    done();
                }
                else if(result.rows[0].email == loginData["email"] && result.rows[0].password == loginData["password"] ){
                    let tokenOBJ = {email: loginData.email, password: loginData.password, id: result.rows[0].id};
                    const loginToken = jwt.sign({"userToken": tokenOBJ}, secret, {expiresIn: 24000});// eslint-disable-next-line
                    
                    res.status(200).json({auth:true, token: loginToken});
                    //pool.end();
                }
            });
        }
    });
}

export default login;