import chai from "chai";
import chaiHttp from "chai-http";
import {createTables} from "../models/database";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Database test", ()=>{
    it("should create database tables", (done)=>{
        
        expect(createTables).to.be.a("function");
        done();
    });
});