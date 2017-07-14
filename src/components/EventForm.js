import React, {Component} from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button/Button';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Tab from 'react-toolbox/lib/tabs/Tab';
import EventFormSchedule from './EventFormSchedule';
import PropTypes from 'prop-types';
import '../styles/EventForm.css';

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
            dateSchedule: event.date_list,
            tabIndex: 0
        };
    }

    handleTabChange(tabIndex) {
        this.setState({tabIndex});
    }

    handleChange(key, value) {
        console.log('EventForm handleChange');
        this.setState({[key]: value});
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

        let tabs = this.props.eventType === 'events'
            ? (
                <Tabs className="EventForm__tabs" index={this.state.tabIndex} onChange={this.handleTabChange.bind(this)}>
                    <Tab label='Weekly Schedule'>
                        <EventFormSchedule days={this.state.weeklySchedule} handleChange={this.handleChange.bind(this)} format="week"/>
                    </Tab>
                    <Tab label='Dates Schedule'>
                        <EventFormSchedule days={this.state.dateSchedule} handleChange={this.handleChange.bind(this)} format="dates"/>
                    </Tab>
                </Tabs>
            )
            : (
                <Tabs className="EventForm__tabs" index={this.state.tabIndex} onChange={this.handleTabChange.bind(this)}>
                    <Tab label='Cancellation Schedule'>
                        <EventFormSchedule days={this.state.dateSchedule} handleChange={this.handleChange.bind(this)} format="dates"/>
                    </Tab>
                </Tabs>

            );

        return (
            <div className="EventForm">
                <Input type='text' label='Title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')}/>
                <Input type='text' multiline label='Description' value={this.state.content} onChange={this.handleChange.bind(this, 'content')}/>
                <div>{tabs}</div>
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
