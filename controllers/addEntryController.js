import jwt from "jsonwebtoken";
import pg from "pg";
import createTables from "../models/database";

createTables();

let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

function addEntry(req, res){ //
    let sentToken = req.body.token || req.headers["authentication"];
    let title = req.body.entryTitle;
    let debody = req.body.entryBody;
    let decoded;

    if(sentToken != "" && sentToken != "undefined"){
        jwt.verify(sentToken, "emailsecret", (err, decode)=>{
            if(err){
                decoded = err;
            }
            else{
                decoded = decode;
            }
        });
        if(decoded.expiredAt){
            res.status(404).json({"Error":"Login to add entries!"});
        }
        else{
            if(decoded.userToken){
                let id = decoded.userToken.id;
                if(debody == "" || debody == "undefined"){
                    res.status(404).json({"Error": "Body of journal is empty!"});
                }
                else{
                
                    pool.connect((err, client, done)=>{
                        if(err){
                            res.status(500).json({success:false, data:err});
                            done();
                        }
                        client.query("INSERT INTO entries(userid, title, body) values ($1, $2, $3)", [id, title, debody], (err, result)=>{
                            if(err){
                                res.status(500).json({success:false, data:err});
                                done();
                            }
                            else{
                                getRecentEntry(res, id);
                                done();
                            }
                        });
                    });
                }
            }
        }
    }
    else{
        res.status(404).json({"Error":"Login to add entries!"});
    }
}

function getRecentEntry(res, id){
    pool.connect((err, client, done)=>{
        if(err){
            res.status(500).json({success:false, data:err});
            done();
        }
        client.query("SELECT * FROM entries WHERE userid = ($1) ORDER BY id DESC LIMIT 1", [id], (err, result)=>{
            if(err){
                res.status(500).json({success:false, data:err});
                done();
            }
            else{
                res.status(200).json({message: "Successfully added", data: result.rows[0]});
                done();
            }
        });
    });
}

export default addEntry;