import express from "express";
import userRouter from "./routes/users";
const app = express();

app.use("/api/v1/users", userRouter);

// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
    //let err = new Error("Not Found");
    //err.status = 404;
    //next(err);
});

// error handler
/*app.use((err, req, res, next)=>{
    res.status(err.status || 500).json(err.message);
});*/

app.listen(4000);
export default app;