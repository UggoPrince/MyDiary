import jwt from "jsonwebtoken";
import pg from "pg";
import createTables from "../models/database";

createTables();

let pool = new pg.Pool("postgres://uggo:admin@localhost:5432/uggo");

function modifyEntry(req, res){
    let isEntryID = isNaN(req.params.entryId);
    let entryID = req.params.entryId;
    let sentToken = req.headers["authentication"];
    let title = req.body.entryTitle;
    let debody = req.body.entryBody;
    let modifyData = {
        "title":title,
        "body":debody
    };
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
                    if(debody == "" || debody == "undefined"){
                        res.status(404).json({"Error": "Body of journal is empty!"});
                    }
                    else{
                        pool.connect((err, client, done)=>{
                            if(err){
                                res.status(500).json({success:false, data:err});
                                done();
                            }
                            client.query("SELECT * FROM entries WHERE userid=($1) ORDER BY id ASC", [id], (err, result)=>{
                                if(err){
                                    res.status(500).json({success:false, data:err});
                                    done();
                                }
                                else{
                                    if(result.rows == 0 || result.rowCount < entryID){
                                        res.status(404).json({error: "no entry like that"});
                                        done();
                                    }
                                    else{
                                        let dbTime = result.rows[0].created_at;
                                        let mytime = new Date().toLocaleString();
                                        let dbT = dbTime.split("/");
                                        let myt = mytime.split("/");
                                        let t1 = parseInt(dbT[1], 10);
                                        let t2 = parseInt(myt[1], 10);
                                        if(t1 >= t2){
                                            let eID = entryID - 1;
                                            eID = result.rows[eID].id;
                                            updateEntry(res, eID, modifyData);
                                        }
                                        else{
                                            res.status(404).json("You can't update this journal. Its more than 24 hours since its entry.");
                                            done();
                                        }
                                    }
                                }
                            });
                        });
                    }
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

function updateEntry(res, entryID, modifyData){
    pool.connect((err, client, done)=>{
        if(err){
            res.status(500).json({success:false, data:err});
            done();
        }
        let eDate = new Date().toLocaleString();
        client.query("UPDATE entries SET title=($1), body=($2), updated_at=($3), updated=($4) WHERE id=($5)",
            [modifyData.title, modifyData.body, eDate, true, entryID]);

            client.query("SELECT * FROM entries WHERE id =($1)", [entryID], (err, result)=>{
                if(err){
                    res.status(500).json({success:false, data:err});
                    done();
                }

                res.status(200).json({message: "Successfully Modified", data: result.rows});
                done();
            });
    });
}

export default modifyEntry;