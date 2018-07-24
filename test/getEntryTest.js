import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import router from "../routes/usersRouter";
const app = express();

app.use("/api/v1/users", router);
// catch 404 and forward to error handler
app.use((req, res)=>{
    res.status(404).json("Not Found");
});

app.set("port", process.env.PORT || 3000);

const expect = chai.expect;
chai.use(chaiHttp);

describe("GET /api/v1/users/:userId/entries/:entryId", ()=>{
    describe("should return an entry or error message telling you its not found", ()=>{
        it("should return entry 1 for user with id-2", (done)=>{
            chai.request(app)
                .get("/api/v1/users/2/entries/1")
                .end((err, res)=>{
                    const deEntries = {
                        data:{
                                "id":1,
                                "Title":"The lord is good to me.",
                                "Body":"A friend I've been praying for just got admitted to Havard University!"
                                    +" let good things keep happening.",
                                "Time":"15/07/2018 07:28am",
                                "Updated":false
                            },
                        meta:{}
                    };
                    expect(res.status).to.be.eql(200);
                    expect(res.type).to.be.equal("application/json");
                    expect(res.body).to.be.eql(deEntries);
                    done();
                });
        });
        it("should return error responce for entry 4 for user with id-2 for its not existing there", (done)=>{
            chai.request(app)
                .get("/api/v1/users/2/entries/4")
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error:404,
                            message: "No entry with id - 4 found."
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

    describe("should tell the user make an entry if non is found", ()=>{
        it("should tell the user to Add an entry if no entry is found", (done)=>{
            chai.request(app)
                .get("/api/v1/users/5/entries/1")
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
    });

    describe("User is not found", ()=>{
        it("When the user with a specific ID doesn't exist in database", (done)=>{
            chai.request(app)
                .get("/api/v1/users/6/entries/2")
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
    });

    describe("When the entryId parameter in the URL is not a positive integer", ()=>{
        it("should respond that such an entry doesnt exist", (done)=>{
            chai.request(app)
                .get("/api/v1/users/2/entries/f")
                .end((err, res)=>{
                    let deError = {
                        meta:{
                            error: 404,
                            message: "No entry with id - f exist"
                        },
                        data:{}
                    };
                    expect(res.status).to.be.eql(404);
                    expect(res.type).to.be.equal("application/json");
                    expect(res.body).to.be.eql(deError);
                    done();
                });
        });
    });

    describe("When the userId parameter in the URL is not a positive integer", ()=>{
        it("should respond that such a user doesnt exist if non-integer characters a added to the userID or"+
        " a negative integer", (done)=>{
        chai.request(app)
            .get("/api/v1/users/2f/entries/3")
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
    });

    it("should tell the user that a wrong URL was entered", (done)=>{
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