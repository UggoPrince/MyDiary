import express from "express";
import bodyParser from "body-parser";
import Users from "../models/users";
import Diary from "../models/entries";

const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));

const deUser = new Users();
const myEntries = new Diary();

function getEntries (req, res){
    let isUserID = isNaN(req.params.userId);
    let isEntryID = isNaN(req.params.entryId);
    let userID = req.params.userId;

    if(!isUserID){
        userID = parseInt(userID, 10);
        if(deUser.checkUser(userID)){
            let isEntriesExist = myEntries.checkUserEntries(userID);
            if(isEntriesExist != -1){
                let entries = myEntries.getDiary(isEntriesExist);
                let packet = {
                    meta:{},
                    data: entries
                };
                res.status(200).json(packet);
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
                message: "No User with id - " + userID + " exist"
            },
            data:{}
        };
        res.status(404).json(err);
    }
}

export default getEntries;