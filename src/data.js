//Events example data
//Cancellation
// {
//     id: 2075,
//     date: "2017-07-09T17:45:02",
//     date_gmt: "2017-07-09T17:45:02",
//     guid: {
//         rendered: "http://www.alternateroutesgym.com/?post_type=ar_event&#038;p=2075"
//     },
//     modified: "2017-07-09T17:47:51",
//     modified_gmt: "2017-07-09T17:47:51",
//     slug: "intro-to-twists-and-flips-and-twists-1-cancelled",
//     status: "publish",
//     type: "ar_event",
//     link: "http://www.alternateroutesgym.com/ar_event/intro-to-twists-and-flips-and-twists-1-cancelled/",
//     title: {
//         rendered: "Intro to Flips, and Flips &#038; Twists 1 Cancelled"
//     },
//     content: {
//         rendered: "<p>Intro to Twists and Flips and Twists 1 classes are cancelled today.</p> ",
//         protected: false,
//     },
//     featured_media: 0,
//     template: "",
//     acf: {
//         calendar_color: "",
//         calendar_name: "",
//         recurrence_type: "weekly",
//         recurring_date_list: false,
//         featured_image_as_header: "circle",
//         cta_display: "auto",
//         cancel_all: false,
//         event_categories_cancelled: false,
//         events_cancelled: [
//             {
//                 event_cancelled: 1895
//             }, {
//                 event_cancelled: 1891
//             },
//         ],
//         cancellation_dates: [
//             {
//                 date: "07/21/2017"
//             }
//         ],
//         cancel_start_time: "",
//         cancel_end_time: "",
//     },
//     _links: {
//         self: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/ar_event/2075"
//             }
//         ],
//         collection: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/ar_event"
//             }
//         ],
//         about: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/types/ar_event"
//             }
//         ],
//         wp: attachment: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/media?parent=2075"
//             }
//         ],
//         curies: [
//             {
//                 name: "wp",
//                 href: "https://api.w.org/{rel}",
//                 templated: true,
//             }
//         ],
//     },
// };
//Recurring Event
// {
//     id: 1990,
//     date: "2017-04-20T14:09:16",
//     date_gmt: "2017-04-20T14:09:16",
//     guid: {
//         rendered: "http://staging.cborchert.com/alternateroutes/?post_type=ar_event&#038;p=1990"
//     },
//     modified: "2017-04-20T14:09:16",
//     modified_gmt: "2017-04-20T14:09:16",
//     slug: "flips-and-twists-1-teenadult",
//     status: "publish",
//     type: "ar_event",
//     link: "http://www.alternateroutesgym.com/ar_event/flips-and-twists-1-teenadult/",
//     title: {
//         rendered: "Flips and Twists 1 Teen/Adult"
//     },
//     content: {
//         rendered: "",
//         protected: false,
//     },
//     featured_media: 0,
//     template: "",
//     acf: {
//         calendar_color: "#dd44ad",
//         calendar_name: "",
//         recurrence_type: "weekly",
//         recurring_date_list: [
//             {
//                 days_of_week: [
//                     "2", "4",
//                 ],
//                 start_time: "7:00 pm",
//                 end_time: "8:00 pm",
//             }
//         ],
//         featured_image_as_header: "circle",
//         cta_display: "auto",
//     },
//     _links: {
//         self: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/ar_event/1990"
//             }
//         ],
//         collection: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/ar_event"
//             }
//         ],
//         about: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/types/ar_event"
//             }
//         ],
//         wp: attachment: [
//             {
//                 href: "http://www.alternateroutesgym.com/wp-json/wp/v2/media?parent=1990"
//             }
//         ],
//         curies: [
//             {
//                 name: "wp",
//                 href: "https://api.w.org/{rel}",
//                 templated: true,
//             }
//         ],
//     },
// },
var data = {

    calendars: [
        {
            name: 'Calendar 1',
            id: 1,
            events: [
                {
                    id: 0,
                    slug: "event1",
                    status: "publish",
                    link: "http://www.google.com",
                    title: {
                        rendered: "Recurring t/th"
                    },
                    content: {
                        rendered: "<p>eram quid sint enim aute magna multos cillum minim amet esse legam culpa legam ipsum legam veniam elit legam tamen</p>"
                    },
                    //calendar_color: "#dd44ad",
                    //calendar_name: "",
                    recurrence_type: "weekly", //weekly or date_list
                    recurring_date_list: [
                        {
                            days_of_week: [
                                "2", "4",
                            ],
                            start_time: "7:00 pm",
                            end_time: "8:00 pm",
                        }
                    ]
                }, {
                    id: 1,
                    slug: "event2",
                    status: "publish",
                    link: "http://www.google.com",
                    title: {
                        rendered: "Recurring m/t/f with an exception"
                    },
                    content: {
                        rendered: "<p>nulla esse aute illum minim export eram tamen ipsum irure labore elit elit export velit nisi quis veniam summis quid</p>"
                    },
                    //calendar_color: "#dd44ad",
                    //calendar_name: "",
                    recurrence_type: "weekly", //weekly or date_list
                    recurring_date_list: [
                        {
                            days_of_week: [
                                "1", "2", "5",
                            ],
                            start_time: "12:00 pm",
                            end_time: "3:00 pm",
                        }
                    ],
                    exceptions: [
                        {
                            date: "07/11/2017",
                            start_time: "9:00am",
                            end_time: "12:00pm"
                        },
                    ]
                }, {
                    id: 2,
                    slug: "event2",
                    status: "publish",
                    link: "http://www.google.com",
                    title: {
                        rendered: "Singleton Event 7/4 - 7/6"
                    },
                    content: {
                        rendered: "<p>elit enim quis aliqua quis malis enim dolore quae quem quae magna enim ipsum export summis multos illum ipsum eram</p>"
                    },
                    //calendar_color: "#dd44ad",
                    //calendar_name: "",
                    recurrence_type: "date_list", //weekly or date_list
                    date_list: [
                        {
                            date: "07/04/2017",
                            start_time: "9:00am",
                            end_time: "12:00pm"
                        }, {
                            date: "07/05/2017",
                            start_time: "9:00am",
                            end_time: "12:00pm"
                        }, {
                            date: "07/06/2017",
                            start_time: "9:00am",
                            end_time: "12:00pm"
                        },
                    ],
                },
            ],
        },
    ]
};

export default data;
