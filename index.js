import express from "express";
import router from "./routes/users";
const app = express();

app.use("/api/v1/users", router);

// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.listen(4000);
//app.set("port", process.env.PORT || 3000);
//export default app;