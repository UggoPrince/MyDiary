import express from "express";
import bodyParser from "body-parser";
import signupRouter from "./routes/authRouter";
import getEntriesRouter from "./routes/entriesRouter";

const app = express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1/", signupRouter);
app.use("/api/v1/", getEntriesRouter);

// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.listen(port);

export default app;