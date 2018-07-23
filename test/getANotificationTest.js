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

describe("GET /api/v1/users/:userId/notifications/:notifyId", ()=>{
    describe("It should return a notification or error message telling you its not found", ()=>{
        it("It should return notification 1 for user with id-2", (done)=>{
            chai.request(app)
                .get("/api/v1/users/2/notifications/1")
                .end((err, res)=>{
                    const deNotify = {
                        data:{
                                "id":1,
                                "Body":"It's fellowship time",
                                "timeCreated": "06/07/2018 02:18pm",
                                "noticeTime": {
                                    year: "2018",
                                    month:"07",
                                    day:"20",
                                    time: "06:00 pm"
                                },
                                "Updated":true
                            },
                        meta:{}
                    };
                    expect(res.status).to.be.eql(200);
                    expect(res.type).to.be.equal("application/json");
                    expect(res.body).to.be.eql(deNotify);
                    done();
                });
        });
        it("It should return error responce for notification 4 for user with id-2 for its not existing there", (done)=>{
            chai.request(app)
                .get("/api/v1/users/2/notifications/4")
                .end((err, res)=>{
                    let error = {
                        meta:{
                            error:404,
                            message: "No notification with id - 4 found."
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

    describe("It should tell the user to set a notification if non is found", ()=>{
        it("It should tell the user to set a notification if non is found", (done)=>{
            chai.request(app)
                .get("/api/v1/users/5/notifications/1")
                .end((err, res)=>{
                    let deError = {
                        meta:{
                            error:404,
                            message: "No notification for user with id - 5 found. kindly set one."
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
                .get("/api/v1/users/6/notifications/2")
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

    describe("When the notifyId parameter in the URL is not a positive integer", ()=>{
        it("It should respond that such a notification doesnt exist", (done)=>{
            chai.request(app)
                .get("/api/v1/users/2/notifications/f")
                .end((err, res)=>{
                    let deError = {
                        meta:{
                            error: 404,
                            message: "No notification with id - f exist"
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
        it("It should respond that such a user doesnt exist if non-integer characters a added to the userID or"+
        " a negative integer", (done)=>{
        chai.request(app)
            .get("/api/v1/users/2f/notifications/3")
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