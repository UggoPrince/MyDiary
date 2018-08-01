import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("GET /api/v1/entries", ()=>{

    let tokenOBJ = {email: "fore89prince@gmail.com", password: "12345678", id: 21};
    const loginToken = jwt.sign({"userToken": tokenOBJ}, "emailsecret", {expiresIn: 2400});

    let exToken = {email: "prince@gmail.com", password: "12345678", id: 9};
    const exLoginToken = jwt.sign({"userToken": exToken}, "emailsecret", {expiresIn: -1});

    describe("when there is no active token", ()=>{
        it("should tell the user to login", (done)=>{
            chai.request(app)
            .get("/api/v1/entries")
            .set({"authentication":""})
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql({"Error":"Login to view entries!"});
                done();
            });
        });
    });

    describe("when the user has no entry yet", ()=>{
        it("should tell the user to add an entry", (done)=>{
            chai.request(app)
            .get("/api/v1/entries")
            .set({"authentication": loginToken})
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(200);
                expect(res.body).to.be.eql({"message": "No entry found. Kindly add an entry."});
                done();
            });
        });
    });

    describe("when the user token has expired", ()=>{
        it("should tell the user to login", (done)=>{
            chai.request(app)
            .get("/api/v1/entries")
            .set({"authentication": exLoginToken})
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql({"Error":"Login to view entries!"});
                done();
            });
        });
    });

    describe("When the user enters a wrong url", ()=>{
        it("should tell the user 'Not Found'", (done)=>{
            chai.request(app)
            .get("/api/v1/entrie")
            .set({"authentication": exLoginToken})
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql("Not Found");
                done();
            });
        });
    });
});