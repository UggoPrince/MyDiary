import Users from "../models/users";
import Diary from "../models/entries";

const deUser = new Users();
const myEntries = new Diary();

function addEntry(req, res){
    let isUserID = isNaN(req.params.userId);
    let userID = req.params.userId;

    req.body = {
            "id":1,
            "Title":"My first day at andela boot camp.",
            "Body":"Reflecting on my first boot camp and how far i've come. Anticipating on how "
                +"the second one counld be like",
            "Time":"06/07/2018 02:18pm",
            "Updated":true

    };

    if(!isUserID){
        userID = parseInt(userID, 10);
        if(deUser.checkUser(userID)){
            let isEntriesExist = myEntries.checkUserEntries(userID);
            if(isEntriesExist != -1){
                
                --isEntriesExist; // reduce it to its position in the this.entries array in Diary.
                let total = myEntries.checkTotalEntry(isEntriesExist);
                req.body = {
                    "id":total + 1,
                    "Title":"My first day at andela boot camp.",
                    "Body":"Reflecting on my first boot camp and how far i've come. Anticipating on how "
                        +"the second one counld be like",
                    "Time":new Date().toString(),
                    "Updated":false
                };
                let added = myEntries.addEntry(isEntriesExist, req.body);
                let packet = {
                    meta:{},
                    data: added
                };
                res.status(200).json(packet);
            }
            else{
                req.body = {
                    "id":1,
                    "Title":"My first day at andela boot camp.",
                    "Body":"Reflecting on my first boot camp and how far i've come. Anticipating on how "
                        +"the second one counld be like",
                    Time:new Date().toString(),
                    "Updated":false
                };
                let added = myEntries.addNewEntry(userID, req.body);
                let packet = {
                    meta:{},
                    data: added
                };
                res.status(200).json(packet);
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
                message: "No User with id - " + userID + " exist"
            },
            data:{}
        };
        res.status(404).json(err);
    }
}

export default addEntry;