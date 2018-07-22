import express from "express";
import bodyParser from "body-parser";
import Users from "../models/users";
import Notifications from "../models/notifications";

const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));

const deUser = new Users();
const notifies = new Notifications();

function getNotifications(req, res){
    let isUserID = isNaN(req.params.userId);
    let userID = req.params.userId;

    if(!isUserID){
        userID = parseInt(userID, 10);
        if(deUser.checkUser(userID)){
            let isNotifiesExist = notifies.checkUserNotifies(userID);
            if(isNotifiesExist != -1){
                let notices = notifies.getNoticeBook(isNotifiesExist);
                let packet = {
                    meta:{},
                    data: notices
                };
                res.status(200).json(packet);
            }
            else{
                let err = {
                    meta:{
                        error:404,
                        message: "No notification(s) for user with id - " + userID + " found. kindly set one."
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

export default getNotifications;