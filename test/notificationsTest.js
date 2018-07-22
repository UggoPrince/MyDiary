import chai from "chai";
import chaiHttp from "chai-http";
import Notifications from "../models/notifications";
const expect = chai.expect;
chai.use(chaiHttp);

describe("Notifications", ()=>{
    let notifies;

    beforeEach(()=>{
        notifies = new Notifications();
    });

    describe("Instance of a Object", ()=>{
        it("notifies refers to the instance of an object", ()=>{
            expect(notifies).to.be.a("object");
        });
    });

    describe("Notifications.checkUserNotifies(id) returns a number", ()=>{
        it("Notifications.checkUserNotifies(id) returns a positive number", ()=>{
            expect(notifies.checkUserNotifies(1)).to.be.a("number");
            expect(notifies.checkUserNotifies(1)).to.be.eql(2);
        });

        it("Notifications.checkUserNotifies(id) returns a negative number", ()=>{
            expect(notifies.checkUserNotifies(3)).to.be.a("number");
            expect(notifies.checkUserNotifies(3)).to.be.eql(-1);
        });
    });

    describe("Notifications.getNotifications()", ()=>{
        it("Notifies.getNotifications() returns an array containg notifications of users", ()=>{
            expect(notifies.getNotifications()).to.be.a("array");
        });
    });

    describe("Notifications.getNoticeBook(posID)", ()=>{
        it("notifies.getNoticeBook(1) should return notifications for user with id = 2 "+
                "if that user has at least one notification", ()=>{
            let i = notifies.checkUserNotifies(2);
            const deNotifies = {
                "posID":1,
                "userId":2,
                "reminders":[
                    {
                        "id":1,
                        "Body":"It's fellowship time",
                        "timeCreated": "06/07/2018 02:18pm",
                        "noticeTime": {
                            year: "2018",
                            month:"07",
                            day:"20",
                            time: "06:00 pm"
                        },
                        "Updated":true
                    },
                    {
                        "id":2,
                        "Body":"You have to go to Lekki to give a talk!",
                        "timeCreated": "07/07/2018 07:59pm",
                        "noticeTime": {
                            year: "2018",
                            month:"08",
                            day:"5",
                            time: "06:00 am"
                        },
                        "Updated":false
                    }
                ],
                "Total":2
            };

            expect(notifies.getNoticeBook(i)).to.be.a("object");
            expect(notifies.getNoticeBook(i)).to.be.eql(deNotifies);
        });
    });
});