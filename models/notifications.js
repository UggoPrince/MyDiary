class Notifications{
    constructor(){
        this.allNotice = this.getNotifications();
    }

    checkUserNotifies(id){
        for(let notif of this.allNotice){
            if(id == notif.userId) {
                return notif.posID;
            }
        }
        return -1;
    }

    getNoticeBook(posID){
        return this.allNotice[posID - 1];
    }

    getNotifications(){
        let notifications = [
            {
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
            },
            {
                "posID":2,
                "userId":1,
                "reminders":[
                    {
                        "id":1,
                        "Body":"You're node.js class is starting today by 2pm!",
                        "timeCreated": "10/07/2018 11:00am",
                        "noticeTime": {
                            year: "2018",
                            month:"07",
                            day:"10",
                            time: "12:00 am"
                        },
                        "Updated":false
                    },
                    {
                        "id":2,
                        "Body":"Stephnie will be coming home today",
                        "timeCreated": "11/07/2018 10:15am",
                        "noticeTime": {
                            year: "2018",
                            month:"08",
                            day:"1",
                            time: "07:00 am"
                        },
                        "Updated":false
                    },
                    {
                        "id":3,
                        "Body": "Time to pray",
                        "timeCreated": "12/07/2018 05:26pm",
                        "noticeTime": {
                            year: "2018",
                            month:"07",
                            day:"13",
                            time: "10:00 pm"
                        },
                        "Updated":false
                    }
                ],
                "Total":3
            }
        ];
        return notifications;
    }
}

export default Notifications;