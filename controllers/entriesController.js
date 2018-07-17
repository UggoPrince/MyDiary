import express from "express";
import bodyParser from "body-parser";
import request from "request";
import Users from "../models/users";
import Diary from "../models/entries";

const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));

const deUser = new Users();
const myEntries = new Diary();
const reqOptions = {
    url: "",
    method: "GET",
    headers: {
        "Accept":"application/json",
        "Accept-Charset": "utf-8",
        "User-Agent": "MyDiary"
    }
};

function getEntries (req, res){
    res.writeHead(200, {"content-type":"application/json"});
        res.json("hello express");
}

export default getEntries;