import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("GET /api/v1/entries/entryId", ()=>{

    let tokenOBJ = {email: "uggoprince@gmail.com", password: "12345678", id: 3};
    const loginToken = jwt.sign({"userToken": tokenOBJ}, "emailsecret", {expiresIn: 2400});

    let exToken = {email: "prince@gmail.com", password: "12345678", id: 9};
    const exLoginToken = jwt.sign({"userToken": exToken}, "emailsecret", {expiresIn: -1});

    describe("when the user enters a wrong entry Id", ()=>{
        it("should tell the user that 'wrong journal id!'", (done)=>{
            chai.request(app)
                .get("/api/v1/entries/3f")
                .set({"authentication":""})
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error":"Wrong journal id!"});
                    done();
                });
        });
    });

    describe("when a token has expired", ()=>{
        it("should tell the user to login again to view entries", (done)=>{
            chai.request(app)
                .get("/api/v1/entries/3")
                .set({"authentication": exLoginToken})
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error":"Login to view entries!"});
                    done();
                });
        });
    });

    describe("when a token has not expired but there is no entry with the id the user provided", ()=>{
        it("should tell the user 'No entry with that id was found'", (done)=>{
            chai.request(app)
                .get("/api/v1/entries/50")
                .set({"authentication": loginToken})
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.eql({"message": "No entry with that id was found"});
                    done();
                });
        });
    });

    describe("when the user enters a wrong url", ()=>{
        it("should return 'Not Found", (done)=>{
            chai.request(app)
            .get("/api/v1/entrie/")
            .end((err, res)=>{
                expect(res.type).to.be.equal("application/json");
                expect(res.status).to.be.eql(404);
                expect(res.body).to.be.eql("Not Found");
                done();
            });
        });
    });
});