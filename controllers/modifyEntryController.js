import Users from "../models/users";
import Diary from "../models/entries";

const deUser = new Users();
const myEntries = new Diary();

function modifyEntry(req, res){
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
                    let total = myEntries.checkTotalEntry(isEntriesExist);
                    if(total >= entryID){
                        let dataUpdate = {
                            "id":entryID,
                            "Title":"When the day goes well",
                            "Body":"One of the best thing that can happen to you "
                                +"is when you are having a wonderful day",
                            "Time":new Date().toString(),
                            "Updated":true
                        };
                        let modified = myEntries.modifyEntry(isEntriesExist, entryID, dataUpdate);
                        let packet = {
                            meta:{},
                            data: modified,
                            message:"Successfully Updated"
                        };
                        res.status(200).json(packet);
                    }
                    else{
                        let err = {
                            meta:{
                                error:404,
                                message: "No entry with id - " + entryID + " found in Diary"
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
                            message: "No entry found in Diary."
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

export default modifyEntry;