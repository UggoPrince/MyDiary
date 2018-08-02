import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("PUT /api/v1/entries/entryId", ()=>{

    let tokenOBJ = {email: "uggoprince@gmail.com", password: "12345678", id: 3};
    const loginToken = jwt.sign({"userToken": tokenOBJ}, "emailsecret", {expiresIn: 2400});

    let exToken = {email: "prince@gmail.com", password: "12345678", id: 9};
    const exLoginToken = jwt.sign({"userToken": exToken}, "emailsecret", {expiresIn: -1});

    describe("when the user enters a wrong url", ()=>{
        it("should return 'Not Found", (done)=>{
            chai.request(app)
            .put("/api/v1/entrie/")
            .send()
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql("Not Found");
                done();
            });
        });
    });

    describe("when the user enters a wrong entry Id", ()=>{
        it("should tell the user that 'wrong journal id!'", (done)=>{
            chai.request(app)
                .put("/api/v1/entries/3f")
                .set({"authentication":""})
                .send()
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error":"Wrong journal id!"});
                    done();
                });
        });
    });

    describe("when token has expired", ()=>{
        it("should return tell the user to login", (done)=>{

            let data = {
                entryTitle:"My test title",
                entryBody:"any thing goes here",
                token:""
            };

            chai.request(app)
            .put("/api/v1/entries/1")
            .set({"authentication": exLoginToken})
            .send(data)
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql({"Error":"Login to modify the entry!"});
                done();
            });
        });
    });

    describe("when token has not expired but the body of the entry is empty", ()=>{
        it("should return tell the user that the body is empty", (done)=>{

            let data = {
                entryTitle:"My test title",
                entryBody:"",
                token:loginToken
            };

            chai.request(app)
            .put("/api/v1/entries/1")
            .set({"authentication": loginToken})
            .send(data)
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql({"Error": "Body of journal is empty!"});
                done();
            });
        });
    });

    describe("when there is no entry with that id", ()=>{
        it("should tell the user that there's no entry like that", (done)=>{

            let data = {
                entryTitle:"My test title",
                entryBody:"body of an entry",
                token:loginToken
            };

            chai.request(app)
            .put("/api/v1/entries/66")
            .set({"authentication": loginToken})
            .send(data)
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql({"message": "Found No entry for that id."});
                done();
            });
        });
    });

    describe("when the entry exist and its not up to 24hours that it was entered", ()=>{
        it("should update the entry", (done)=>{

            let data = {
                "entryTitle":"any title",
                "entryBody": "any body",
                "token":loginToken
            };

            chai.request(app)
            .put("/api/v1/entries/1")
            .set({"authentication": loginToken})
            .send(data)
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(200);
                expect(res.body).to.be.a("object");
                done();
            });
        });
    });

});