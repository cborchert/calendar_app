import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Button from 'react-toolbox/lib/button/Button';
import Day from './Day';
import '../styles/Month.css';

class Month extends Component {

    //TODO: optimize filterEventsByDate: reduce the recurring events beforehand and organizing weekly
    //TODO: optimize filterEventsByDate: non-recurring events thrown out when the month/year does not match
    //TODO: optimize filterEventsByDate: consider using undercores
    filterEventsByDate(date, type) {

        let dayOfWeek = date.getDay(),
            dateEvents = [],
            events = this.props[type];

        events.forEach((event, index) => {
            let eventOnDay = false;
            //Check if the day of the week is in the recurring date list
            if (event.recurring_date_list) {
                event.recurring_date_list.forEach(item => {
                    item.days_of_week.forEach(day => {
                        if (day == dayOfWeek) {
                            item.times.forEach(time => {
                                let dateEvent = {
                                    meta: {
                                        index: index,
                                        type: type
                                    },
                                    id: event.id,
                                    slug: event.slug,
                                    status: event.status,
                                    link: event.link,
                                    title: event.title,
                                    content: event.content,
                                    times: {
                                        start: time.start_time,
                                        end: time.end_time
                                    }
                                };
                                dateEvents.push(dateEvent);
                            });
                        }
                    });
                });
            }
            //Check if the date is in the date list
            if (event.date_list) {
                event.date_list.forEach(eventDate => {
                    if (date.toDateString() === eventDate.date.toDateString()) {
                        let dateEvent = {
                            meta: {
                                index: index,
                                type: type
                            },
                            id: event.id,
                            slug: event.slug,
                            status: event.status,
                            link: event.link,
                            title: event.title,
                            content: event.content,
                            times: {
                                start: eventDate.start_time,
                                end: eventDate.end_time
                            }
                        };
                        if (type === 'cancellations') {
                            dateEvent.cancelAllEvents = event.cancelAllEvents;
                            dateEvent.cancelledEventIds = event.cancelledEventIds;
                        }
                        dateEvents.push(dateEvent);
                    }
                });
            }
        });

        return dateEvents;

    }

    onMonthBack = function(e) {
        e.preventDefault();
        this.props.changeMonth(-1);
    }

    onMonthNext = function(e) {
        e.preventDefault();
        this.props.changeMonth(1);
    }

    render() {
        //Month Name thanks to https://stackoverflow.com/questions/1643320/get-month-name-from-date
        let monthName = new Date(this.props.year, this.props.month, 1).toLocaleString("en-us", {month: "long"}),
            weekDayNames = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ],
            daysInMonth = new Date(this.props.year, this.props.month + 1, 0).getDate();

        //The following will return the day (number of week of the first of the month)
        //Will be used to cushion the first week
        let firstDateDay = new Date(this.props.year, this.props.month, 1).getDay(),
            weeks = [],
            dayInWeekCounter = 0,
            dayCounter = Number(String(this.props.year) + String(this.props.month)) * 100;

        //Form the first week
        let week = [];
        for (let i = 0; i < firstDateDay; i++) {
            week.push((<Day key={dayCounter}/>));
            dayInWeekCounter++;
            dayCounter++;
        }

        //Form the rest of the days
        for (let i = 1; i <= daysInMonth; i++) {

            let dateFull = new Date(this.props.year, this.props.month, Number(i)),
                //Get events in day
                dayEvents = this.filterEventsByDate(dateFull, 'events'),
                //Get cancellations in day
                dayCancellations = this.filterEventsByDate(dateFull, 'cancellations');

            week.push((<Day key={dayCounter} date={String(i)} dateFull={dateFull} events={dayEvents} cancellations={dayCancellations} editEvent={this.props.editEvent} deleteEvent={this.props.deleteEvent}/>));
            dayInWeekCounter++;
            dayCounter++;
            if (dayInWeekCounter % 7 === 0 || i === daysInMonth) {
                weeks.push(week);
                week = [];
            }
        }

        return (
            <div className="Month">
                <div className="Month__header">
                    <button className="btn btn--circle btn--large" onClick={this.onMonthBack.bind(this)} aria-label="Back">
                        <FontAwesome name="chevron-left"/>
                    </button>
                    <div className="Month__header__name">
                        <span className="Month__header__name__month">
                            {monthName}
                        </span>
                        <span className="Month__header__name__year">
                            {this.props.year}
                        </span>
                    </div>
                    <button className="btn btn--circle btn--large" onClick={this.onMonthNext.bind(this)} aria-label="Next">
                        <FontAwesome name="chevron-right"/>
                    </button>
                </div>
                <div className="Month__body">
                    <div className="Month__body__header">
                        <div className="Month__week Month__week--header">
                            {weekDayNames.map((dayName, i) => {
                                return (<Day key={i} innerText={dayName} isHeader={true}/>);
                            })}
                        </div>
                    </div>
                    {weeks.map((week, i) => {
                        return (
                            <div key={i} className="Month__week">
                                {week.map(day => day)}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

Month.propTypes = {
    changeMonth: PropTypes.func,
    editEvent: PropTypes.func,
    newEvent: PropTypes.func,
    month: PropTypes.number,
    year: PropTypes.number,
    //Is the following necessary? We already defined this above
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        slug: PropTypes.string,
        status: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        //calendar_color: PropTypes.string,
        //calendar_name: PropTypes.string,
        //recurrence_type: PropTypes.oneOf(["date_list", "weekly"]),
        recurring_date_list: PropTypes.arrayOf(PropTypes.shape({days_of_week: PropTypes.array, start_time: PropTypes.string, end_time: PropTypes.string})),
        exceptions: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.string, start_time: PropTypes.string, end_time: PropTypes.string})),
        date_list: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.date, start_time: PropTypes.string, end_time: PropTypes.string}))
    }))
}

Month.defaultProps = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
};

export default Month;
