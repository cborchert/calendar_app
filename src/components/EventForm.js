import React, {Component} from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox';
import EventFormSchedule from './EventFormSchedule';
import PropTypes from 'prop-types';

//TODO: this and lower elements are too stateful
class EventForm extends Component {

    constructor(props) {
        console.log('EventForm constructor');
        super(props);
        let event = this.props.event;
        this.state = {
            title: event.title,
            content: event.content,
            weeklySchedule: event.recurring_date_list,
            dateSchedule: event.date_list
        };
    }

    handleEventChange(name, value) {
        console.log(this);
        console.log('EventForm handleEventChange');
        let event = this.state.event;
        event[name] = value;
        this.setState({event: event});

    }

    handleChange(key, e) {
        console.log(e);
        this.setState({[key]: e});
    }

    saveEvent(e) {
        console.log('EventForm saveEvent');
        e.preventDefault();
        let event = {
            id: this.props.event.id,
            recurring_date_list: this.state.weeklySchedule,
            date_list: this.state.dateSchedule,
            title: this.state.title,
            content: this.state.content
        };
        this.props.updateSelectedEvent(event);
    }

    render() {
        return (
            <div className="EventForm">
                <Input type='text' label='Title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')}/>
                <Input type='text' multiline label='Description' value={this.state.content} onChange={this.handleChange.bind(this, 'content')}/>
                <EventFormSchedule days={this.state.weeklySchedule} handleChange={this.handleChange.bind(this)} format="week"/>
                <EventFormSchedule days={this.state.dateSchedule} handleChange={this.handleChange.bind(this)} format="dates"/>
                <div className="EventForm__footer">
                    <Button label="Cancel" accent onClick={this.props.cancelEventChanges}/>
                    <Button icon="check" label="Save" primary raised onClick={this.saveEvent.bind(this)}/>
                </div>
            </div>
        );
    }
}

EventForm.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
        recurring_date_list: PropTypes.arrayOf(PropTypes.shape({days_of_week: PropTypes.array, start_time: PropTypes.string, end_time: PropTypes.string})),
        date_list: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.date, start_time: PropTypes.string, end_time: PropTypes.string}))
    })
};

export default EventForm;
