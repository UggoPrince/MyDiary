import jwt from "jsonwebtoken";
import pg from "pg";

let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

function signup(req, res){
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
    
    if(fname == "" || fname == "undefined"){
        res.status(404).json({"Error": "Firstname is not valid"});
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
        pool.connect((err, client, done)=>{
            if(err){
                // eslint-disable-next-line
                console.log(err);
                res.status(500).json({success:false, data:err});
                done();
            }

            client.query("SELECT * FROM users WHERE email = ($1)", [userData.email], (err, result)=>{
                if(err){
                    res.status(500).json(err);
                }
                else if(result.rowCount > 0){
                    res.status(404).json({"Error": "Email already exist. kindly sign in."});
                    done();
                }
                else{
                    //this.registerUser(userData, req, res);
                    let secret = userData.email;

        
                        client.query("INSERT INTO users(firstname, lastname, email, password) values($1, $2, $3, $4)", 
                            [userData.firstname, userData.lastname, userData.email, userData.password], (err, result)=>{
                        if(err){
                            // eslint-disable-next-line
                            console.log(result);
                            res.status(500).json(err);
                        }
                        else{
                            const token = jwt.sign({"email": userData.email}, secret, {expiresIn: 240});// eslint-disable-next-line
                            res.status(201).json({auth:true, token: token});
                        }
                    });
                }
            });
        });

        pool.end();
    }
}

export default signup;