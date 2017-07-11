import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import '../styles/Month.css';

class Month extends Component {

    //TODO: optimize filterEventsByDate consider reducing the events beforehand and organizing weekly
    //TODO: optimize filterEventsByDate consider using undercores
    //TODO: dates should be fed in in unix time or something that does not require conversion
    filterEventsByDate(date) {

        let dayOfWeek = date.getDay();
        return this.props.events.filter(event => {
            let eventOnDay = false;
            //Check if the day of the week is in the recurring date list
            if (event.recurring_date_list) {
                event.recurring_date_list.forEach(item => {
                    item.days_of_week.forEach(day => {
                        if (day == dayOfWeek) {
                            eventOnDay = true;
                        }
                    });
                });
            }
            //Check if the date is in the date list
            if (event.date_list) {
                event.date_list.forEach(eventDate => {
                    let eventDateArray = eventDate.date.split('/'),
                        //The months in javascript are 0 based
                        eventDateObject = new Date(Number(eventDateArray[2]), Number(eventDateArray[0]) - 1, Number(eventDateArray[1]));
                    console.log(eventDateArray, eventDateObject);
                    if (date.getTime() == eventDateObject.getTime()) {
                        eventOnDay = true;
                    }
                });
            }
            return eventOnDay;
        })
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
                dayEvents = this.filterEventsByDate(dateFull);
            //Deal with cancellations

            week.push((<Day key={dayCounter} date={String(i)} dateFull={dateFull} events={dayEvents}/>));
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
                    <button>Back</button>
                    <span>
                        {monthName}
                    </span>
                    <span>
                        {this.props.year}
                    </span>
                    <button>Next</button>
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
    month: PropTypes.number,
    year: PropTypes.number,
    //Is the following necessary? We already defined this above
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        slug: PropTypes.string,
        status: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.shape({rendered: PropTypes.string}),
        content: PropTypes.shape({rendered: PropTypes.string}),
        //calendar_color: PropTypes.string,
        //calendar_name: PropTypes.string,
        //recurrence_type: PropTypes.oneOf(["date_list", "weekly"]),
        recurring_date_list: PropTypes.arrayOf(PropTypes.shape({days_of_week: PropTypes.array, start_time: PropTypes.string, end_time: PropTypes.string})),
        exceptions: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.string, start_time: PropTypes.string, end_time: PropTypes.string})),
        date_list: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.string, start_time: PropTypes.string, end_time: PropTypes.string}))
    }))
}

Month.defaultProps = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
};

export default Month;
