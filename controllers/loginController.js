import jwt from "jsonwebtoken";
import pg from "pg";

let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

function login(req, res){
    let email = req.body.email;
    let password = req.body.password;

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
            let tokenExist = req.headers["x-access-token"];
            if(tokenExist) {
                res.json(tokenExist);
                done();
            }
            if(err){
                // eslint-disable-next-line
                console.log(err);
                res.status(500).json({success:false, data:err});
                done();
            }
            let secret = email;

            

            client.query("SELECT * FROM users WHERE email = ($1)", [loginData.email], (err, result)=>{
                if(err){
                    res.status(500).json({success:false, data:err});
                    done();
                }
                else if(result.rowCount == 0){
                    res.status(404).json({"Error": "Email not found. kindly sign up."});
                }
                else if(result.rows[0].email == loginData["email"] && result.rows[0].password != loginData["password"] ){
                    res.status(404).json({"Error": "Invalid Email/Password"});
                    done();
                }
                else if(result.rows[0].email == loginData["email"] && result.rows[0].password == loginData["password"] ){
                    const loginToken = jwt.sign({"email": loginData.email}, secret, {expiresIn: 24000});// eslint-disable-next-line
                    let authHeader = req.headers["authorization"];
                    let decoded = jwt.verify(authHeader, email);
                    res.json(decoded);
                    /*jwt.verify(authHeader, email, (err, decoded)=> {
                        if (err) return res.status(500).send({ auth: false, message: "Failed to authenticate token.", error:err});
                        else res.json(decoded);
                    });*/
                    //res.status(202).json({auth:true, token: loginToken, resu:result});
                    //pool.end();
                }
            });
        });
    }
}

export default login;