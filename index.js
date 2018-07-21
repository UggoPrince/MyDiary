import express from "express";
import router from "./routes/users";
const app = express();
let port = process.env.PORT || 4000;

app.use("/api/v1/users", router);

// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.listen(port, ()=>{
    console.log("App running on port " + port);
});
//app.set("port", process.env.PORT || 3000);
//export default app;