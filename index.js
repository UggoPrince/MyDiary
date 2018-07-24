import express from "express";
import usersRouter from "./routes/usersRouter";
const app = express();
let port = process.env.PORT || 4000;

app.use("/api/v1/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`App running on port  ${port}`);
});