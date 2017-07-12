import React, {Component} from 'react';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import EventFormSchedule from './EventFormSchedule';

class EventForm extends Component {
    state = {
        title: '',
        description: '',
        recurring: true,
        dateList: false
    };

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        let days = [
                {
                    days_of_week: [
                        "2", "4"
                    ],
                    start_time: "7:00 pm",
                    end_time: "8:00 pm"
                }
            ],
            dates = [
                {
                    date: "07/04/2017",
                    start_time: "9:00am",
                    end_time: "12:00pm"
                }, {
                    date: "07/05/2017",
                    start_time: "9:00am",
                    end_time: "12:00pm"
                }, {
                    date: "07/06/2017",
                    start_time: "9:00am",
                    end_time: "12:00pm"
                }
            ];
        return (
            <div className="EventForm">
                <Input type='text' label='Title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')}/>
                <Input type='text' multiline label='Description' value={this.state.multiline} onChange={this.handleChange.bind(this, 'description')}/>
                <Checkbox checked={this.state.recurring} label="Recurring Weekly" onChange={this.handleChange.bind(this, 'recurring')}/>
                <EventFormSchedule days={days} format="week"/>
                <Checkbox checked={this.state.dateList} label="Specific Dates" onChange={this.handleChange.bind(this, 'dateList')}/>
                <EventFormSchedule days={dates} format="dates"/>
            </div>
        );
    }
}

export default EventForm;
