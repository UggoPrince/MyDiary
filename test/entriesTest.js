import chai from "chai";
import chaiHttp from "chai-http";
import Entries from "../models/entries";
const expect = chai.expect;
chai.use(chaiHttp);

describe("Entries", ()=>{
    let entries;

    beforeEach(()=>{
        entries = new Entries();
    });

    it("Entries.checkUserEntries(id) returns a boolean value", ()=>{
        expect(entries.checkUserEntries("1")).to.be.a("boolean");
    });
});