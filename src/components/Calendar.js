import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-toolbox/lib/button/Button';
import Month from './Month';
import EventForm from './EventForm';
import '../styles/Calendar.css';

class Calendar extends Component {

    newEventHandler(e) {

        e.preventDefault();
        this.props.newEvent('events');

    }

    render() {
        return (
            <div className="Calendar">
                <div className="Calendar__header">
                    <Button icon='add' label='New Event' primary raised onClick={this.newEventHandler.bind(this)}/>
                </div>
                <div className="Calendar__body">
                    <Month events={this.props.data.events} newEvent={this.props.newEvent} editEvent={this.props.editEvent} deleteEvent={this.props.deleteEvent} changeMonth={this.props.changeMonth} year={this.props.date.getFullYear()} month={this.props.date.getMonth()}/>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    date: PropTypes.object,
    changeMonth: PropTypes.func,
    newEvent: PropTypes.func,
    editEvent: PropTypes.func,
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
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
    })
}

export default Calendar;
