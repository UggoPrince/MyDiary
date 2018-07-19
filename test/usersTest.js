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

    describe("User is a class", ()=>{
        it("user refers to the instance of an object", ()=>{
            expect(user).to.be.a("object");
        });
    });

    describe("Users.checkUser(id) checks is a user exist", ()=>{
        it("Users.checkUser(id) returns a boolean value", ()=>{
            expect(user.checkUser(1)).to.be.a("boolean");
            expect(user.checkUser(6)).to.be.a("boolean");
        });
    

        it("Users.checkUser(1) returns true", ()=>{
            expect(user.checkUser(1)).to.be.equal(true);
        });

        it("Users.checkUser(6) returns false", ()=>{
            expect(user.checkUser(6)).to.be.equal(false);
        });
    });

    describe("Users.getUsers() returns all users", ()=>{
        it("Users.getUsers() returns an array containg users details", ()=>{
            expect(user.getUsers()).to.be.a("array");
        });
    });

    describe("Users.getUser(id) returns a particular if the user's details exist", ()=>{
        it("Users.getUser(1) should return an object having user details of a particular details if a"+
        " user with the id = 1 exist", ()=>{
            const aUser = new Users();
            const deUser = {
                "userId":1,
                "email":"ben@gmail.com",
                "password":"12345678",
                "fisrtname":"Ben",
                "lastname":"Carson"
            };
        expect(aUser.getUser(1)).to.be.a("object");
        expect(aUser.getUser(1)).to.be.eql(deUser);
        });

        it("Users.getUser(6) should return null because the user doesn't exist", ()=>{
            expect(user.getUser(6)).to.be.equal(null);
        });
    });
});
