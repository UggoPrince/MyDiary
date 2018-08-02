import {Pool} from "pg";
import config from "../../config";
const db = new Pool(config);

db.connect().then(()=>{// eslint-disable-next-line
    console.log("Successfully connected to database");
}).catch((err)=>{// eslint-disable-next-line
    console.log(err.message);
});

export default db;