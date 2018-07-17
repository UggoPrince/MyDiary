import express from "express";
import router from "./routes/route.js";
const app = express();

app.use("/", router);

app.listen(process.env.PORT || 4000);
export default app;