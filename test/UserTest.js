import chai from "chai";
import chaiHttp from "chai-http";
import user from "../server/models/User";

const expect = chai.expect;
chai.use(chaiHttp);

describe("User test", ()=>{
    it("should be an object", (done)=>{
        
        expect(user).to.be.a("object");
        done();
    });
});