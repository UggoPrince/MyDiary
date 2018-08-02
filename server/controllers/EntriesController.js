import entries from "../models/Entries";
import {tokenStatus, verifyToken, validID, validEntry} from "../../helpers/allHelpers";

class EntriesController{
    constructor(){
    }

    async getEntries(req, res){
        let sentToken = req.headers["authentication"];
        let nToken = await tokenStatus(sentToken);

        if(nToken == "not empty"){
            let myToken = await verifyToken(sentToken).
                    then((decode)=>{
                        return decode;
                    }).catch((err)=>{
                        return err;
                    });

            if(myToken.expiredAt){
                res.status(404).json({"Error":"Login to view entries!"});
            }
            else if(myToken.userToken){
                let id = myToken.userToken.id;
                let myEntries = await entries.getEntries("SELECT * FROM entries WHERE userid = ($1)", id);

                if(myEntries.rowCount > 0){
                    res.status(200).json(myEntries.rows);
                }
                else{
                    res.status(200).json({"message": "No entry found. Kindly add an entry."});
                }
            }
        }
        else{
            res.status(404).json({"Error":"Login to view entries!"});
        }
    }

    async getAnEntry(req, res){
        let entryID = req.params.entryId;
        let sentToken = req.headers["authentication"];

        if(!validID(entryID)){
            const nToken = await tokenStatus(sentToken);
            if(nToken == "not empty"){
                const myToken = await verifyToken(sentToken).
                        then((decode)=>{
                            return decode;
                        }).catch((err)=>{
                            return err;
                        });
                
                if(myToken.expiredAt){
                    res.status(404).json({"Error":"Login to get entries!"});
                }
                else if(myToken.userToken){
                    let id = myToken.userToken.id;
                    let myEntries = await entries.getEntries("SELECT * FROM entries WHERE userid = ($1)", id);

                    if(myEntries.rowCount > 0 && myEntries.rowCount >= entryID){
                        const eID = entryID - 1;
                        res.status(200).json(myEntries.rows[eID]);
                    }
                    else{
                        res.status(200).json({"message": "Found No entry for that id. Kindly add an entry."});
                    }
                }
            }
            else{
                res.status(404).json({"Error":"Login to get entries!"});
            }
        }
        else{
            res.status(404).json({"Error":"Wrong journal id!"});
        }
    }

    async addAnEntry(req, res){
        let sentToken = req.headers["authentication"];
        let title = req.body.entryTitle;
        let debody = req.body.entryBody;

        const nToken = await tokenStatus(sentToken);
        if(nToken == "not empty"){
            const myToken = await verifyToken(sentToken).
                    then((decode)=>{
                        return decode;
                    }).catch((err)=>{
                        return err;
                    });

            if(myToken.expiredAt){
                res.status(404).json({"Error":"Login to add an entry!"});
            }
            else if(myToken.userToken){
                if(validEntry(debody)){
                    const id = myToken.userToken.id;
                    const eDate = new Date().toLocaleString();
                    let entry = await entries.addEntry("INSERT INTO entries(userid, title, body, created_at) values ($1, $2, $3, $4)",
                                            [id, title, debody, eDate]);
                    if(entry == 1){
                        let lastEntry = await entries.getEntries("SELECT * FROM entries WHERE userid = ($1) ORDER BY id DESC LIMIT 1", id);

                        res.status(200).json({message: "Successfully added", result: lastEntry.rows});
                    }
                }
                else{
                    res.status(404).json({"Error": "Body of journal is empty!"});
                }
            }
        }
        else{
            res.status(404).json({"Error":"Login to add an entry!"});
        }
    }

    async modifyAnEntry(req, res){
        let entryID = req.params.entryId;
        let sentToken = req.headers["authentication"];
        let title = req.body.entryTitle;
        let debody = req.body.entryBody;
        let modifyData = {
            "title":title,
            "body":debody
        };

        if(!validID(entryID)){
            const nToken = await tokenStatus(sentToken);
            if(nToken == "not empty"){
                const myToken = await verifyToken(sentToken).
                        then((decode)=>{
                            return decode;
                        }).catch((err)=>{
                            return err;
                        });
                
                if(myToken.expiredAt){
                    res.status(404).json({"Error":"Login to modify the entry!"});
                }
                else if(myToken.userToken){
                    if(validEntry(debody)){
                        const id = myToken.userToken.id;

                        let myEntries = await entries.getEntries("SELECT * FROM entries WHERE userid=($1) ORDER BY id ASC", id);

                        if(myEntries.rowCount > 0 && myEntries.rowCount >= entryID){
                            const eID = entryID - 1;
                            let entry = myEntries.rows[eID];
                            let modifyID = myEntries.rows[eID].id;

                            let dbTime = entry.created_at;
                            let mytime = new Date().toLocaleString();
                            let dbT = dbTime.split("/");
                            let myt = mytime.split("/");
                            let t1 = parseInt(dbT[1], 10);
                            let t2 = parseInt(myt[1], 10);
                            if(t1 >= t2){
                                let modify = await entries.addEntry("UPDATE entries SET title=($1), body=($2), updated_at=($3), updated=($4) WHERE id=($5)",
                                                        [modifyData.title, modifyData.body, mytime, true, modifyID]);
                                if(modify == 1){
                                    let modified = await entries.getEntries("SELECT * FROM entries WHERE id =($1)", modifyID);
                                    res.status(200).json({message: "Successfully Modified", data: modified.rows});
                                }
                            }
                            else{
                                res.status(404).json("You can't update this journal. Its more than 24 hours since its entry.");
                            }
                        }
                        else{
                            res.status(404).json({"message": "Found No entry for that id."});
                        }
                    }
                    else{
                        res.status(404).json({"Error": "Body of journal is empty!"});
                    }
                }
            }
            else{
                res.status(404).json({"Error":"Login to modify the entry!"});
            }
        }
        else{
            res.status(404).json({"Error":"Wrong journal id!"});
        }
    }
}

let entriesCon = new EntriesController();

export {entriesCon};