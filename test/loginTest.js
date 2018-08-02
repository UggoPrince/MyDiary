import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /api/v1/auth/login", ()=>{

    let tokenOBJ = {email: "uggoprince@gmail.com", password: "12345678", id: 3};
    const loginToken = jwt.sign({"userToken": tokenOBJ}, "emailsecret", {expiresIn: 24000});

    let userData = { 
        "email": "uggoprince@gmail.com", 
        "password": "12345678",
        "token": loginToken
    };

    let userData2 = { 
        "email": "", 
        "password": "12345678"
    };

    let userData3 = {
        "email": "uggoprince@gmail.com", 
        "password": "1234"
    };

    let userData4 = {
        "email": "wrongemail@gmail.com", 
        "password": "123456789"
    };

    let userData5 = {
        "email": "newmanmail@gmail.com", 
        "password": "12345678",
        "token":""
    };

    let userData6 = {
        "email": "newmanmail@gmail.com", 
        "password": "123456786",
        "token":""
    };

    describe("When the user doesn't provide an email for login", ()=>{
        it("should tell the user that an invalid email was provided", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData2)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });

    describe("When the user doesn't provide a password or its less than 8 characters for login", ()=>{
        it("should tell the user that the password provided is less than 8", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData3)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });

    describe("When the user provides an email and password that is in the database and has been logged in before", ()=>{
        it("should tell the user that authentication was successful", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .set({"authentication": loginToken})
                .send(userData)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });

    /*describe("When the user provides an email and password that is in the database", ()=>{
        it("should tell the user that authentication was successful", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .set({"authenticate":loginToken})
                .send(userData)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });*/

    /*describe("When the user provides an email that is not in the database", ()=>{
        it("should tell the user that an invalid email or password was provided", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .set({"authentication": loginToken})
                .send(userData4)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Invalid Email/Password"});
                    done();
                });
        });
    });*/

    describe("When the user provides an email that is correct and a wrong password", ()=>{
        it("should tell the user that an invalid email or password was provided", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                //.set({"authentication": loginToken})
                .send(userData6)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Invalid Email/Password"});
                    done();
                });
        });
    });

    describe("When the user enters a wrong url", ()=>{
        it("should tell the user 'Not Found'", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/logi")
                //.set({"authentication": loginToken})
                .send(userData4)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql("Not Found");
                    done();
                });
        });
    });

});