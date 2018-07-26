import jwt from "jsonwebtoken";
import pg from "pg";

const conString = "postgres://uggo:admin@localhost:5432/uggo";
const pool = new pg.Pool(conString);


function signup(req, res){
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
                done();// eslint-disable-next-line
                console.log(err);
                res.status(500).json({success:false, data:err});
            }

            let existEmail;

            client.query("SELECT * FROM users WHERE email = ($1)", [userData.email])
            .then((result) => {
                existEmail = result.rowCount;
                if(existEmail > 0){
                    res.status(404).json({"Error": "Email already exist. kindly sign in."});
                    done();
                }
                else{

                    client.query("INSERT INTO users(firstname, lastname, email, password) values($1, $2, $3, $4)", 
                            [userData.firstname, userData.lastname, userData.email, userData.password])
                    .then((result) => {

                        const token = jwt.sign({"email": userData.email}, email, {expiresIn: 240});// eslint-disable-next-line
                        console.log(result);
                        res.status(200).json({auth:true, token: token});
                        done();

                    }).catch((err) => {
                        res.status(500).json(err);
                        done();
                    });
                }
            }).catch((err) => {
                res.status(500).json(err);
                done();
            });
        });
    }
}

export default signup;