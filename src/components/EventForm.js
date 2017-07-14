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
        this.state = {
            event: this.props.event
        };
        console.log(this.props.event);
    }

    handleEventChange(name, value) {
        console.log(this);
        console.log('EventForm handleEventChange');
        let event = this.state.event;
        event[name] = value;
        this.setState({event: event});

    }

    saveEvent(e) {
        console.log('EventForm saveEvent');
        e.preventDefault();
        this.props.updateSelectedEvent(this.state.event);
    }

    render() {
        return (
            <div className="EventForm">
                <Input type='text' label='Title' name='title' value={this.state.event.title} onChange={this.handleEventChange.bind(this, 'title')}/>
                <Input type='text' multiline label='Description' value={this.state.event.content} onChange={this.handleEventChange.bind(this, 'content')}/>
                <EventFormSchedule days={this.state.event.recurring_date_list} handleEventChange={this.handleEventChange.bind(this)} format="week"/>
                <EventFormSchedule days={this.state.event.date_list} handleEventChange={this.handleEventChange.bind(this)} format="dates"/>
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
