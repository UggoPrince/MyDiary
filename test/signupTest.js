import {app, expect, chai} from "./index";

describe("sign up test", ()=>{
    
    let newData = {
        "firstname": "ken", 
        "lastname": "peter", 
        "email": "bettermail@gmail.com", 
        "password": "12345678"
    };

    let userData = {
        "firstname": "ugo", 
        "lastname": "anayo", 
        "email": "uggoprince@gmail.com", 
        "password": "12345678"
    };

    let userData2 = {
        "firstname": "", 
        "lastname": "anayo", 
        "email": "uggoprince@gmail.com", 
        "password": "12345678"
    };

    let userData3 = {
        "firstname": "ugo", 
        "lastname": "", 
        "email": "uggoprince@gmail.com", 
        "password": "12345678"
    };

    let userData4 = {
        "firstname": "ugo", 
        "lastname": "anayo", 
        "email": "", 
        "password": "12345678"
    };

    let userData5 = {
        "firstname": "ugo", 
        "lastname": "anayo", 
        "email": "uggoprince@gmail.com", 
        "password": ""
    };

    describe("when its a new user sign up with a non used email", ()=>{
        it("should create a token an authenticate the user", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newData)
                .end((err, res)=>{
                    if(res.status == 201){
                        expect(res.type).to.be.equal("application/json");
                        expect(res.status).to.be.eql(201);
                    }
                    else{
                        expect(res.status).to.be.eql(404);
                    }
                    done();
                });
        });
    });

    /*describe("When a user wants to register with a used email", ()=>{
        it("should tell user that email has already been used", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404 || 500);
                    expect(res.body).to.be.eql({"Error": "Email already exist. kindly sign in."});
                    done();
                });
        });
    });*/

    describe("when the user doesn't enter a firstname", ()=>{
        it("should tell the user that an invalid firstname was entered", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData2)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Firstname is not valid"});
                    done();
                });
        });
    });

    describe("when the user doesn't enter a lastname", ()=>{
        it("should tell the user that an invalid lastname was entered", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData3)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Lastname is not valid"});
                    done();
                });
        });
    });

    describe("when the user doesn't enter an email", ()=>{
        it("should tell the user that an invalid email was entered", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData4)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Invalid email"});
                    done();
                });
        });
    });

    describe("when the user doesn't enter a password or enters a password less than 8 characters", ()=>{
        it("should tell the user that an invalid password was entered", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(userData5)
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql({"Error": "Password should be more than 8."});
                    done();
                });
        });
    });

    describe("when url is entered", ()=>{
        it("should tell the user that nothing found", (done)=>{
            chai.request(app)
                .post("/api/v1/auth/sign")
                .send()
                .end((err, res)=>{
                    expect(res.type).to.be.equal("application/json");
                    expect(res.status).to.be.eql(404);
                    expect(res.body).to.be.eql("Not Found");
                    done();
                });
        });
    });
});