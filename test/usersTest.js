import chai from "chai";
import chaiHttp from "chai-http";
import Users from "../models/users";
const expect = chai.expect;
chai.use(chaiHttp);


describe("Users", ()=>{
    let user;

    beforeEach(()=>{
        user = new Users();
    });

    it("Users.checkUser(id) returns a boolean value", ()=>{
        expect(user.checkUser("1")).to.be.a("boolean");
    });

    it("Users.checkUser(1) returns true", ()=>{
        expect(user.checkUser("1")).to.be.equal(true);
    });

    it("Users.checkUser(5) returns false", ()=>{
        expect(user.checkUser("5")).to.be.equal(false);
    });
});
