import jwt from "jsonwebtoken";
import pg from "pg";
import createTables from "../models/database";

createTables();

let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

function getAnEntry(req, res){
    let isEntryID = isNaN(req.params.entryId);
    let entryID = req.params.entryId;
    let sentToken = req.headers["authentication"];
    let decoded;

    if(!isEntryID && Math.sign(entryID) != -1 && entryID != 0){
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
                res.status(404).json({"Error":"Login to view entries!"});
            }
            else{
                if(decoded.userToken){
                    let id = decoded.userToken.id;
                    pool.connect((err, client, done)=>{
                        if(err){
                            res.status(500).json({success:false, data:err});
                            done();
                        }
                        client.query("SELECT * FROM entries WHERE userid = ($1) ORDER BY id ASC", [id], (err, result)=>{
                            if(err){
                                res.status(500).json({success:false, data:err});
                                done();
                            }
                            else if(result.rowCount == 0 || result.rowCount < entryID){
                                res.status(200).json({"message": "No entry with that id was found"});
                                done();
                            }
                            else{
                                let eID = entryID - 1;
                                res.status(200).json(result.rows[eID]);
                                done();
                            }
                        
                        });
                    });
                }
            }
        }
        else{
            res.status(404).json({"Error":"Login to view entries!"});
        }
    
    }
    else{
        res.status(404).json({"Error":"Wrong journal id!"});
    }
}

export default getAnEntry;