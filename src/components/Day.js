import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/Day.css';

class Day extends Component {

    render() {
        console.log(this.props.events);
        let classes = 'Day';
        if (this.props.isHeader)
            classes += ' Day--header';

        return (
            <div className={classes}>
                <div className="Day__date"></div>
                <div className="Day__date--short">{this.props.date}</div>
                <div className="Day__inner-text">{this.props.innerText}</div>
                <div className="Day__events">
                    {this.props.events.map((event, i) => {
                        return (
                            <div key={i} className="Event" data-event={event}>
                                {event.title.rendered}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

Day.propTypes = {
    innerText: PropTypes.string,
    isHeader: PropTypes.bool,
    date: PropTypes.string,
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

Day.defaultProps = {
    innerText: '',
    isHeader: false,
    date: '',
    events: []
}
export default Day;
