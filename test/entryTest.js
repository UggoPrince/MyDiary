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
    describe("Entries is an object", ()=>{
            it("entries refers to the instance of an object", ()=>{
                expect(entries).to.be.a("object");
            });
        }
    );

    describe("Entries.checkTotalEntry(posId) gets the total entry", ()=>{
        it("should return the total entry for a user if the user has made" +
            " at least one entry", ()=>{
                expect(entries.checkTotalEntry(1)).to.be.a("number");
            });
        it("should return null if the user has made no entry", ()=>{
            expect(entries.checkTotalEntry(5)).to.be.eql(null);
        });
        }
    );

    describe("Entries.checkUserEntries(id)", ()=>{
            it("Entries.checkUserEntries(id) should return a number", ()=>{
                expect(entries.checkUserEntries(1)).to.be.a("number");
            });
            it("Entries.checkUserEntries(5) should return a negative integer (-1)", ()=>{
                expect(entries.checkUserEntries(5)).to.be.eql(-1);
            });
            it("Entries.checkUserEntries(1) should return a positive integer (2)", ()=>{
                expect(entries.checkUserEntries(1)).to.be.eql(2);
            });
        }
    );

    describe("Entries.getEntry(i, j)", ()=>{
            it("should return an entry object", ()=>{
                expect(entries.getEntry(1, 0)).to.be.a("object");
            });
            it("should return an entry if the user has it", ()=>{
                let ent = {
                    "id":1,
                    "Title":"I had a dream",
                    "Body":"I had a dream. I saw myself flying, and in another instance I was the president.",
                    "Time":"10/07/2018 11:00am",
                    "Updated":false
                };
                expect(entries.getEntry(1, 0)).to.be.eqls(ent);
            });
        }
    );

    describe("Entries.getEntries()", ()=>{
        it("Entries.getEntries() returns an array containg entries of users", ()=>{
            expect(entries.getEntries()).to.be.a("array");
        });
    });

    describe("Entries.getDiary(posID) gets a user's entries", ()=>{
            it("Entries.getDiary(2) should return an object having entrie(s) for a user with userID - 2,"+
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
});