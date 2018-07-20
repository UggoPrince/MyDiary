import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
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

describe("GET /api/v1/users/userId/entries", ()=>{
    it("It should return entries for user with ID-2", (done)=>{
        chai.request(app)
            .get("/api/v1/users/2/entries")
            .end((err, res)=>{
                const deEntries = {
                    data:{
                        "posID":4,
                        "userId":2,
                        "entries":[
                            {
                                "id":1,
                                "Title":"The lord is good to me.",
                                "Body":"A friend I've been praying for just got admitted to Havard University!"
                                    +" let good things keep happening.",
                                "Time":"15/07/2018 07:28am",
                                "Updated":false
                            },
                            {
                                "id":2,
                                "Title":"When you can't sleep",
                                "Body":"Been trying to sleep but can't. Just wrote this the second time.",
                                "Time":"16/07/2018 03:14am",
                                "Updated":true
                            },
                            {
                                "id":3,
                                "Title":"No competition in life.",
                                "Body":"There's no competition when you're manifesting your own lane :) - Dulce Ruby",
                                "Time":"17/07/2018 08:30pm",
                                "Updated":false
                            }
                        ],
                        "Total":3
                    },
                    meta:{}
                };
                expect(res.status).to.be.eql(200);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(deEntries);
                done();
            });
    });

    it("It should tell the user to Add an entry if no entry is found", (done)=>{
        chai.request(app)
            .get("/api/v1/users/5/entries")
            .end((err, res)=>{
                let deError = {
                    meta:{
                        error:404,
                        message: "No entries for user with id - 5 found. kindly Add an entry."
                    },
                    data:{}
                };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(deError);
                done();
            });
    });

    it("When the user with a specific ID doesn't exist in database", (done)=>{
        chai.request(app)
            .get("/api/v1/users/6/entries")
            .end((err, res)=>{
                let deError = {
                    meta:{
                        error: 404,
                        message: "User resource with id - 6 not found"
                    },
                    data:{}
                };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(deError);
                done();
            });
    });

    it("It should respond that such a user doesnt exist if non-integer characters a added to the userID or"+
        " a negative integer", (done)=>{
        chai.request(app)
            .get("/api/v1/users/2f/entries")
            .end((err, res)=>{
                let deError = {
                    meta:{
                        error: 404,
                        message: "No User with id - 2f exist"
                    },
                    data:{}
                };
                expect(res.status).to.be.eql(404);
                expect(res.type).to.be.equal("application/json");
                expect(res.body).to.be.eql(deError);
                done();
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