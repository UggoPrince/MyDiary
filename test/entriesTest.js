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

    it("entries refers to the instance of an object", ()=>{
        expect(entries).to.be.a("object");
    });

    it("Entries.checkUserEntries(id) returns a number", ()=>{
        expect(entries.checkUserEntries(1)).to.be.a("number");
    });

    it("Entries.getEntries() returns an array containg entries of users", ()=>{
        expect(entries.getEntries()).to.be.a("array");
    });

    it("Entries.getDiary(4) should return an object having entrie(s) for a user with userID - 2,"+
        " as long as the user has entrie(s)", ()=>{
            const myEntries = new Entries();
            let i = myEntries.checkUserEntries(2);
            --i;
            const deEntries = {
                "posID":4,
                "userId":2,
                "entries":[
                    {
                        "id":1,
                        "Title":"The lord is good to me.",
                        "Body":"A friend I've been praying for just got admitted to Havard University!"
                            +" let good things keep happening.",
                        "Time":"15/07/2018 07:28am",
                        "Updated":false
                    },
                    {
                        "id":2,
                        "Title":"When you can't sleep",
                        "Body":"Been trying to sleep but can't. Just wrote this the second time.",
                        "Time":"16/07/2018 03:14am",
                        "Updated":true
                    },
                    {
                        "id":3,
                        "Title":"No competition in life.",
                        "Body":"There's no competition when you're manifesting your own lane :) - Dulce Ruby",
                        "Time":"17/07/2018 08:30pm",
                        "Updated":false
                    }
                ],
                "Total":3
            };
        expect(myEntries.getDiary(i)).to.be.a("object");
        expect(myEntries.getDiary(i)).to.be.eql(deEntries);
    });
});