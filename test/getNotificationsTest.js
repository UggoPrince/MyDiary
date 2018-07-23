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

describe("GET /api/v1/users/userId/notifications", ()=>{
    describe("GET /api/v1/users/1/notifications", ()=>{
        it("It should return notifications for user with ID-2", (done)=>{
            chai.request(app)
                .get("/api/v1/users/1/notifications")
                .end((err, res)=>{
                    const deNotifies = {
                        data:{
                            "posID":2,
                            "userId":1,
                            "reminders":[
                                {
                                    "id":1,
                                    "Body":"Your node.js class is starting today by 2pm!",
                                    "timeCreated": "10/07/2018 11:00am",
                                    "noticeTime": {
                                        year: "2018",
                                        month:"07",
                                        day:"10",
                                        time: "12:00 am"
                                    },
                                    "Updated":false
                                },
                                {
                                    "id":2,
                                    "Body":"Stephnie will be coming home today",
                                    "timeCreated": "11/07/2018 10:15am",
                                    "noticeTime": {
                                        year: "2018",
                                        month:"08",
                                        day:"1",
                                        time: "07:00 am"
                                    },
                                    "Updated":false
                                },
                                {
                                    "id":3,
                                    "Body": "Time to pray",
                                    "timeCreated": "12/07/2018 05:26pm",
                                    "noticeTime": {
                                        year: "2018",
                                        month:"07",
                                        day:"13",
                                        time: "10:00 pm"
                                    },
                                    "Updated":false
                                }
                            ],
                            "Total":3
                        },
                        meta:{}
                    };
                    expect(res.status).to.be.eql(200);
                    expect(res.type).to.be.equal("application/json");
                    expect(res.body).to.be.eql(deNotifies);
                    done();
                });
        });
    });

    describe("No notifications set for existing user", ()=>{
        it("It should tell the user to Add a notification if no one is found", (done)=>{
            chai.request(app)
                .get("/api/v1/users/5/notifications")
                .end((err, res)=>{
                    let deError = {
                        meta:{
                            error:404,
                            message: "No notification(s) for user with id - 5 found. kindly set one."
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

    describe("User don't exist", ()=>{
        it("When the user with a specific ID doesn't exist in database", (done)=>{
            chai.request(app)
                .get("/api/v1/users/6/notifications")
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

    describe("Non acceptable user ID", ()=>{
        it("It should respond that such a user doesnt exist if non-integer character(s) is added to the userID or"+
        " a negative integer", (done)=>{
        chai.request(app)
            .get("/api/v1/users/2f/notifications")
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

    describe("Wrong URL",()=>{
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
});