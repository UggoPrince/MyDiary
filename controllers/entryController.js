import Users from "../models/users";
import Diary from "../models/entries";

const deUser = new Users();
const myEntries = new Diary();

function getEntries (req, res){
    let isUserID = isNaN(req.params.userId);
    let isEntryID = isNaN(req.params.entryId);
    let userID = req.params.userId;
    let entryID = req.params.entryId;

    if(!isUserID && Math.sign(userID) != -1){
        if(!isEntryID && Math.sign(entryID) != -1){
            userID = parseInt(userID, 10);
            entryID = parseInt(entryID, 10);

            if(deUser.checkUser(userID)){
                let isEntriesExist = myEntries.checkUserEntries(userID);
                if(isEntriesExist != -1){
                    let totalEntry = myEntries.checkTotalEntry(isEntriesExist);

                    if(totalEntry >= entryID){
                        let entry = myEntries.getEntry(isEntriesExist, entryID);
                        let packet = {
                            meta:{},
                            data: entry
                        };
                        res.status(200).json(packet);
                    }
                    else{
                        let err = {
                            meta:{
                                error:404,
                                message: "No entry with id - " + entryID + " found."
                            },
                            data:{}
                        };
                        res.status(404).json(err);
                    }
                }
                else{
                    let err = {
                        meta:{
                            error:404,
                            message: "No entries for user with id - " + userID + " found. kindly Add an entry."
                        },
                        data:{}
                    };
                    res.status(404).json(err);
                }
            }
            else{
                let err = {
                    meta:{
                        error: 404,
                        message: "User resource with id - " + userID + " not found"
                    },
                    data:{}
                };
                res.status(404).json(err);
            }
        }
        else{
            let err = {
                meta:{
                    error: 404,
                    message: "No entry with id - " + entryID + " exist"
                },
                data:{}
            };
            res.status(404).json(err);
        }
        
    }
    else{
        let err = {
            meta:{
                error: 404,
                message: "No User with id - " + userID + " exist"
            },
            data:{}
        };
        res.status(404).json(err);
    }
}

export default getEntries;