import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import '../styles/Day.css';

class Day extends Component {

    applyCancellations(events) {

        events = events.map(event => {
            let cancelEvent = false,
                eventStart = Number(event.times.start.replace(':', '')),
                eventEnd = Number(event.times.end.replace(':', ''));
            this.props.cancellations.forEach(cancellation => {
                //Only if cancel all events or id targetted
                if (cancellation.cancelAllEvents || (cancellation.cancelledEventIds && cancellation.cancelledEventIds.indexOf(event.id) > -1) ) {
                    let cancellationStart = Number(cancellation.times.start.replace(':', '')),
                        cancellationEnd = Number(cancellation.times.end.replace(':', ''));

                    //If the cancellation starts before the event starts
                    //or at the same time
                    //it must and ends after the event starts to be counted
                    if ((cancellationStart <= eventStart) && (cancellationEnd > eventStart)) {
                        cancelEvent = true;

                    }

                    //If the cancellation starts after the event starts
                    //it must and start before the event ends to be counted
                    if ((cancellationStart > eventStart) && (cancellationStart < eventEnd)) {

                        cancelEvent = true;
                    }
                }
            });
            event.isCancelled = cancelEvent;
            return event;
        });

        return events;

    }

    render() {
        let classes = 'Day';
        if (this.props.isHeader)
            classes += ' Day--header';

        return (
            <div className={classes}>
                <div className="Day__date"></div>
                <div className="Day__date--short">{this.props.date}</div>
                <div className="Day__inner-text">{this.props.innerText}</div>
                <div className="Day__cancellations">
                    {this.props.cancellations.map((event, i) => {
                        return (<Event key={i} data={event} editEvent={this.props.editEvent} deleteEvent={this.props.deleteEvent}/>);
                    })}
                </div>
                <div className="Day__events">
                    {this.applyCancellations(this.props.events).map((event, i) => {
                        return (<Event key={i} data={event} editEvent={this.props.editEvent} deleteEvent={this.props.deleteEvent}/>);
                    })}
                </div>
            </div>
        );
    }
}

Day.propTypes = {
    editEvent: PropTypes.func,
    innerText: PropTypes.string,
    isHeader: PropTypes.bool,
    date: PropTypes.string,
    cancellations: PropTypes.array,
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        slug: PropTypes.string,
        status: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        times: PropTypes.shape({start: PropTypes.string, end: PropTypes.string}),
        //calendar_color: PropTypes.string,
        //calendar_name: PropTypes.string,
        //recurrence_type: PropTypes.oneOf(["date_list", "weekly"]),
        recurring_date_list: PropTypes.arrayOf(PropTypes.shape({days_of_week: PropTypes.array, start_time: PropTypes.string, end_time: PropTypes.string})),
        exceptions: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.string, start_time: PropTypes.string, end_time: PropTypes.string})),
        date_list: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.date, start_time: PropTypes.string, end_time: PropTypes.string}))
    }))
}

Day.defaultProps = {
    innerText: '',
    isHeader: false,
    date: '',
    events: [],
    cancellations: []
}
export default Day;
