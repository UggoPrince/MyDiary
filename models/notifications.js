class Notifications{
    constructor(){
        this.allNotice = this.getNotifications();
    }

    getNotifications(){
        let notifications = [
            {
                "posID":1,
                "userId":3,
                "reminders":[
                    {
                        "id":1,
                        "Body":"Reflecting on my first boot camp and how far i've come. Anticipating on how "
                            +"the second one counld be like",
                        "Time":"06/07/2018 02:18pm",
                        "Updated":true
                    },
                    {
                        "id":2,
                        "Body":"One of the best thing that can happen to you "
                            +"is when you are having a wonderful day",
                        "Time":"07/07/2018 07:59pm",
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
                        "Body":"I had a dream. I saw myself flying, and in another instance I was the president.",
                        "Time":"10/07/2018 11:00am",
                        "Updated":false
                    },
                    {
                        "id":2,
                        "Body":"Boss called this morning and said the project has been approved."
                            +"I can over estimate how happy I am right now. Knowing how much I've worked on it in the past"
                            +"few months",
                        "Time":"11/07/2018 10:15am",
                        "Updated":false
                    },
                    {
                        "id":3,
                        "Body":"How did I even come up with this??"
                            +"I guess the traffic has contributed to this. Lagos traffic could be frustrating at times"
                            +"but work has to go on. (sighs...)",
                        "Time":"12/07/2018 05:26pm",
                        "Updated":false
                    }
                ],
                "Total":3
            },
            {
                "posID":3,
                "userId":4,
                "reminders":[
                    {
                        "id":1,
                        "Body":"The car was wrecked beyond repair. But thank God there was no life lost." 
                                +"I couldn't believe my eyes!!",
                        "Time":"13/07/2018 01:02pm",
                        "Updated":false
                    },
                    {
                        "id":2,
                        "Body":"God just openned the windows of heaven. Its been raining since morning and I"
                            +" can't even step out side",
                        "Time":"14/07/2018 04:19pm",
                        "Updated":false
                    }
                ],
                "Total":2
            },
            {
                "posID":4,
                "userId":2,
                "reminders":[
                    {
                        "id":1,
                        "Body":"A friend I've been praying for just got admitted to Havard University!"
                            +" let good things keep happening.",
                        "Time":"15/07/2018 07:28am",
                        "Updated":false
                    },
                    {
                        "id":2,
                        "Body":"Been trying to sleep but can't. Just wrote this the second time.",
                        "Time":"16/07/2018 03:14am",
                        "Updated":true
                    },
                    {
                        "id":3,
                        "Body":"There's no competition when you're manifesting your own lane :) - Dulce Ruby",
                        "Time":"17/07/2018 08:30pm",
                        "Updated":false
                    }
                ],
                "Total":3
            }
            /*{
                "posID":5,
                "userId":5,
                "entries":[],
                "Total":0
            }*/
        ];
        return notifications;
    }
}

export default Notifications;