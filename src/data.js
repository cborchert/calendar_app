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
            events: [],
            cancellations: [
                {
                    id: -1,
                    title: '',
                    content: '',
                    cancelAllEvents: false,
                    cancelledEventIds: [],
                    date_list: [
                        {
                            date: '',
                            start_time: '',
                            end_time: ''
                        }
                    ]
                }
            ]
        }
    ]
};

export default data;
