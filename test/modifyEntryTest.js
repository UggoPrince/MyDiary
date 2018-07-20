import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import router from "../routes/users";
import Diary from "../models/entries";
const app = express();

app.use("/api/v1/users", router);
// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.set("port", process.env.PORT || 3000);

const expect = chai.expect;
chai.use(chaiHttp);

describe("PUT /api/v1/users/:userId/entries/:entryId", ()=>{
    let myEntries;

    beforeEach(()=>{
        myEntries = new Diary();
    });

   describe("When the particular entry to be modified exist", ()=>{
        it("It should return the modified entry with id 2 for user with id 2", (done)=>{
            chai.request(app)
                .put("/api/v1/users/2/entries/2")
                .send()
                .end((err, res)=>{

                    let dataUpdate = {
                        "id":2,
                        "Title":"When the day goes well",
                        "Body":"One of the best thing that can happen to you "
                            +"is when you are having a wonderful day",
                        "Time":new Date().toString(),
                        "Updated":true
                    };
                    let isEntriesExist = myEntries.checkUserEntries(2);
                    let modified = myEntries.modifyEntry(isEntriesExist, 2, dataUpdate);

                    let packet = {
                        meta:{},
                        data: modified,
                        message:"Successfully Updated"
                    };

                    expect(res.status).to.be.eql(200);
                    expect(res.type).to.be.equal("application/json");
                    expect(res.body).to.be.eql(packet);
                    done();
                });
        });
   });

    describe("It should return an error message if the entry doesn't exist", ()=>{
        it("It should return a feedback letting user know that entry with the id is not found in Diary", (done)=>{
            chai.request(app)
                .put("/api/v1/users/2/entries/6")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error:404,
                            message: "No entry with id - 6 found in Diary"
                        },
                        data:{}
                    };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(error);
                done();
                });
        });
    });

    describe("When the user has no entry yet", ()=>{
        it("It should tell the user no entry found in Diary", (done)=>{
            chai.request(app)
                .put("/api/v1/users/5/entries/6")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error:404,
                            message: "No entry found in Diary."
                        },
                        data:{}
                    };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(error);
                done();
                });
        });
    });

    describe("User with a specific id not found", ()=>{
        it("It should return error message that the user doesn't exist", (done)=>{
            chai.request(app)
                .put("/api/v1/users/6/entries/6")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error: 404,
                            message: "User resource with id - 6 not found"
                        },
                        data:{}
                    };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(error);
                done();
                });
        });
    });

    describe("when the entry id is a non positive integer", ()=>{
        it("It should respond with an error message telling the user that the entry id is unapplicable", (done)=>{
            chai.request(app)
                .put("/api/v1/users/6/entries/-2f")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error: 404,
                            message: "No entry with id - -2f exist"
                        },
                        data:{}
                    };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(error);
                done();
                });
        });
    });

    describe("when the user id is a non positive integer", ()=>{
        it("It should respond with an error message telling the user that the user id is unapplicable", (done)=>{
            chai.request(app)
                .put("/api/v1/users/g/entries/2")
                .send()
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error: 404,
                            message: "No User with id - g exist"
                        },
                        data:{}
                    };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(error);
                done();
                });
        });
    });


    it("It should tell the user that a wrong URL was entered", (done)=>{
        chai.request(app)
            .get("/api/v/users/45") // wrong url!
            .end((err, res)=>{
                let deError = "Not Found" || "development";
                expect(res.status).to.be.eql(404 || 500);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(deError);
                done();
            });
    });
});