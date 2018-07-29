import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /api/v1/auth/login Log in test", ()=>{

    let someToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0aGF0cHJpbmNlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJpZCI6IjEzIn0sImlhdCI6MTUzMjg5NjEwNiwiZXhwIjoxNTMyOTIwMTA2fQ.JfuCYQ1nMG0utIl0vKd6PHgf0QErDay2UiRzOfrs8kA";

    let tokenOBJ = {email: "uggoprince@gmail.com", password: "12345678", id: 3};
    const loginToken = jwt.sign({"userToken": tokenOBJ}, "uggoprince@gmail.com", {expiresIn: 24000});

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
        "password": "123456789",
        "token": loginToken
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
                    expect(res.body).to.be.eql({"Error": "Invalid email"});
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
                    expect(res.body).to.be.eql({"Error": "Password should be more than 8."});
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
                    expect(res.body).to.be.eql({auth:true, message: "user is still authenticated"});
                    done();
                });
        });
    });

    describe("When the user provides an email and password that is in the database", ()=>{
        it("should tell the user that authentication was successful", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .send(userData5)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });

    describe("When the user provides an email that is correct and a wrong password", ()=>{
        it("should tell the user that an invalid email or password was provided", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/login")
                .set({"authentication": loginToken})
                .send(userData6)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Invalid Email/Password"});
                    done();
                });
        });
    });

    describe("When the user provides an email that is not in the database", ()=>{
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
    });

});