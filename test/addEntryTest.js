import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import Users from "../models/users";
import Diary from "../models/entries";
import router from "../routes/users";
const app = express();

app.use("/api/v1/users", router);
// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.set("port", process.env.PORT || 3000);

const expect = chai.expect;
chai.use(chaiHttp);

const deUser = new Users();
const myEntries = new Diary();

describe("POST /api/v1/users/:userId/entries/", ()=>{
    describe("It should add an entry if a User exist", ()=>{

        it("it should add an entry if the user has made at least one before", (done)=>{
            chai.request(app)
                .post("/api/v1/users/3/entries/")
                .send()
                .end((err, res)=>{
                    let isEntriesExist = myEntries.checkUserEntries(3);
                    let total = myEntries.checkTotalEntry(isEntriesExist);

                    let added = {
                        "id":total + 1,
                    "Title":"My first day at andela boot camp.",
                    "Body":"Reflecting on my first boot camp and how far i've come. Anticipating on how "
                        +"the second one counld be like",
                    "Time":new Date().toString(),
                    "Updated":false
                    };

                    let pack = {
                        meta:{},
                        data: added
                    };
                        expect(res.type).to.be.equal("application/json");
                        expect(res.status).to.be.eql(200);
                        expect(res.body).to.be.eql(pack);
                    done();
                });
        });

        it("it should add an entry if the user hasn't made any", (done)=>{
            chai.request(app)
                .post("/api/v1/users/5/entries/")
                .send()
                .end((err, res)=>{

                    let added = {
                        "id":1,
                        "Title":"My first day at andela boot camp.",
                        "Body":"Reflecting on my first boot camp and how far i've come. Anticipating on how "
                            +"the second one counld be like",
                        Time:new Date().toString(),
                        "Updated":false
                    };

                    let getAdded = myEntries.addNewEntry(5, added);

                    let pack = {
                        meta:{},
                        data: getAdded
                    };
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.eql(pack);
                    done();
                });
        });
    });

    describe("User don't exist", ()=>{
        it("It should return an error message if a specific user is not found", (done)=>{
            chai.request(app)
                .post("/api/v1/users/6/entries/")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error: 404,
                            message: "User resource with id - 6 not found"
                        },
                        data:{}
                    };
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql(error);
                    done();
                });
        });

        it("It should return an error message if a negative or non numeric userID is in the URL", (done)=>{
            chai.request(app)
                .post("/api/v1/users/2h/entries/")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error: 404,
                            message: "No User with id - 2h exist"
                        },
                        data:{}
                    };
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql(error);
                    done();
                });
        });
    });
});