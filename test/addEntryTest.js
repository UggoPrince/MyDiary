import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /api/v1/entries", ()=>{
    let tokenOBJ = {email: "uggoprince@gmail.com", password: "12345678", id: 3};
    const loginToken = jwt.sign({"userToken": tokenOBJ}, "emailsecret", {expiresIn: 2400});

    let exToken = {email: "prince@gmail.com", password: "12345678", id: 9};
    const exLoginToken = jwt.sign({"userToken": exToken}, "emailsecret", {expiresIn: -1});

    let userData1 = {
        "entryTitle":"any title",
        "entryBody": "any body",
        "token":exLoginToken
    };

    let userData2 = {
        "entryTitle":"any title",
        "entryBody": "",
        "token":loginToken
    };

    let userData3 = {
        "entryTitle":"any title",
        "entryBody": "anybody",
        "token":""
    };

    let userData4 = {
        "entryTitle":"any title",
        "entryBody": "any body",
        "token":loginToken
    };

    /*describe("when the user has not been authenticated", ()=>{
        it("should tell the user to login", (done)=>{
            chai.request(app)
                .post("/api/v1/entries")
                //.set({"authenticate": ""})
                .send(userData3)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error":"Login to add entries!"});
                    done();
                });
        });
    });*/

    describe("when the user is not authenticated due to expired token", ()=>{
        it("should tell the user to login", (done)=>{
            chai.request(app)
                .post("/api/v1/entries")
                .set({"authentication": exLoginToken})
                .send(userData1)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error":"Login to add an entry!"});
                    done();
                });
        });
    });

    describe("when the user's entry has no body", ()=>{
        it("should tell the user to provide a body for the entry", (done)=>{
            chai.request(app)
                .post("/api/v1/entries")
                .set({"authentication": loginToken})
                .send(userData2)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Body of journal is empty!"});
                    done();
                });
        });
    });

    describe("when the user adds an entry", ()=>{
        it("should return the value", (done)=>{
            chai.request(app)
                .post("/api/v1/entries")
                .set({"authentication": loginToken})
                .send(userData4)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.a("object");
                    done();
                });
        });
    });

    describe("when the user enters a wrong url", ()=>{
        it("should return 'Not Found", (done)=>{
            chai.request(app)
            .post("/api/v1/entrie")
            .send()
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql("Not Found");
                done();
            });
        });
            
    });

});