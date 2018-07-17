import chai from "chai";
import chaiHttp from "chai-http";
import router from "../routes/route";
import request from "request";
import Entries from "../models/entries";
const expect = chai.expect;
chai.use(chaiHttp);

/*describe("Users", ()=>{
    describe("users", ()=>{
        let user;

        beforeEach(()=>{
            user = new Users();
        });

        it("returns a boolean value", ()=>{
            expect(user.checkUser("1")).to.be.a("boolean");
        });
    });
});*/