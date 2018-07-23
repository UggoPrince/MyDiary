import express from "express";
import bodyParser from "body-parser";
import Users from "../models/users";
import Notifications from "../models/notifications";

const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));

const deUser = new Users();
const notifies = new Notifications();

function getANotification(req, res){
    let isUserID = isNaN(req.params.userId);
    let isnotifyID = isNaN(req.params.notifyId);
    let userID = req.params.userId;
    let notifyID = req.params.notifyId;

    if(!isUserID && Math.sign(userID) != -1){
        if(!isnotifyID && Math.sign(notifyID) != -1){
            userID = parseInt(userID, 10);
            notifyID = parseInt(notifyID, 10);

            if(deUser.checkUser(userID)){
                let isNotifyExist = notifies.checkUserNotifies(userID);
                if(isNotifyExist != -1){
                    let totalEntry = notifies.checkTotalNotify(isNotifyExist);

                    if(totalEntry >= notifyID){
                        let entry = notifies.getNotify(isNotifyExist, notifyID);
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
                                message: "No notification with id - " + notifyID + " found."
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
                            message: "No notification for user with id - " + userID + " found. kindly set one."
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
                    message: "No notification with id - " + notifyID + " exist"
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

export default getANotification;