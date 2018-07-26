import express from "express";
import bodyParser from "body-parser";
import chai from "chai";
import chaiHttp from "chai-http";
import signupRouter from "../routes/authRouter";

const app = express();
const expect = chai.expect;
chai.use(chaiHttp);

app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1/", signupRouter);

// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

//app.listen(port);

export {app, expect, chai};