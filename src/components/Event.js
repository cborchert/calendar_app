import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/Event.css';

class Event extends Component {

    render() {
        return (
            <div className="Event">
                {this.props.data.title}
            </div>
        );
    }

};

Event.propTypes = {
    data: PropTypes.shape({
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
    })
};

export default Event;
