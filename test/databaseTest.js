import chai from "chai";
import chaiHttp from "chai-http";
import db from "../server/models/database";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Database test", ()=>{
    it("should create database tables", (done)=>{
        
        expect(db).to.be.a("object");
        done();
    });
});