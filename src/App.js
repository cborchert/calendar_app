import React, {Component} from 'react';
//Get react toolbox working
import theme from './assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import './assets/react-toolbox/theme.css';
import 'material-design-icons/iconfont/material-icons.css';
import data from './data';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.css';
import './styles/common.css';
import './styles/material-design-styles.css';

//TODO: dates in events should be in unix time or something that does not require conversion
//TODO: Preprocess Events: events should not have php keys or unnecessary keys.
class App extends Component {

    constructor() {
        console.log('constructor');
        super();
        let date = new Date();
        this.state = {
            date: new Date(date.getFullYear(), date.getMonth(), 1),
            data: data,
            calendarId: 0,
            selectedEvent: {
                id: -1,
                title: '',
                content: '',
                recurring_date_list: [],
                date_list: []
            },
            eventDialog: {
                active: false,
                title: '',
                type: '',
                eventIndex: null
            }
        };
    }

    discardEventDialog() {

        console.log("cancelSelectedEvent");
        this.setState({
            eventDialog: {
                active: false,
                title: '',
                type: '',
                eventIndex: null
            }
        });

    }

    updateSelectedEvent(event) {

        console.log("updateSelectedEvent");
        console.log(event);
        let type = this.state.eventDialog.type,
            index = this.state.eventDialog.eventIndex,
            data = this.state.data,
            selectedEvent = event;

        selectedEvent.id = Number(String(Date.now()) + String(Math.floor(Math.random() * 1000)));

        if (index !== null && data.calendars[this.state.calendarId][type] && data.calendars[this.state.calendarId][type][index]) {

            data.calendars[this.state.calendarId][type][index] = selectedEvent;

        } else if (data.calendars[this.state.calendarId][type]) {

            data.calendars[this.state.calendarId][type].push(selectedEvent);
        }

        this.setState({data: data});
        this.discardEventDialog();

    }

    openEventDialog() {

        console.log('openEventDialog');
        let eventDialog = this.state.eventDialog;
        eventDialog.active = true;
        this.setState({eventDialog: eventDialog});

    }

    setSelectedEvent(type, index) {

        console.log('setSelectedEvent');
        let eventDialog = this.state.eventDialog,
            selectedEvent = {
                id: -1,
                title: '',
                content: '',
                recurring_date_list: [],
                date_list: []
            };

        eventDialog.type = type;
        eventDialog.eventIndex = index;
        if (index !== null && this.state.data.calendars[this.state.calendarId][type] && this.state.data.calendars[this.state.calendarId][type][index]) {

            selectedEvent = this.state.data.calendars[this.state.calendarId][type][index];
            eventDialog.title = 'Edit';
            if (type == 'events') {
                eventDialog.title += ' Event';
            }
            let title = selectedEvent.title;
            if (title !== "") {
                eventDialog.title += ': ' + title;
            }

        } else {

            eventDialog.title = 'Create New ';
            if (type == 'events') {
                eventDialog.title += ' Event';
            }

        }

        this.setState({eventDialog: eventDialog, selectedEvent: selectedEvent});

    }

    editEvent(type, index) {

        console.log('editEvent', type, index);
        this.setSelectedEvent(type, index);
        this.openEventDialog();

    }

    newEvent(type) {

        console.log('newEvent');
        this.setSelectedEvent(type, null);
        this.openEventDialog();

    }

    changeMonth(direction) {
        console.log('changeMonth');
        let date = this.state.date;
        date.setMonth(date.getMonth() + direction);
        this.setState({date});

    }

    addEvent(event) {
        console.log('addEvent');
        let data = this.state.data;
        data.calendars[this.state.calendarId].events.push(event);
        this.setState({data});

    }

    deleteEvent(type, index) {

        let data = this.state.data;
        if (index !== null && data.calendars[this.state.calendarId][type] && data.calendars[this.state.calendarId][type][index]) {
            data.calendars[this.state.calendarId][type].splice(index, 1);
        }
        this.setState({data});

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">

                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <Dialog active={this.state.eventDialog.active} title={this.state.eventDialog.title} type="large" onEscKeyDown={this.discardEventDialog.bind(this)} className="Dialog--scrollable Dialog--mid-width">
                        <EventForm event={this.state.selectedEvent} eventType={this.state.eventDialog.type} cancelEventChanges={this.discardEventDialog.bind(this)} updateSelectedEvent={this.updateSelectedEvent.bind(this)}/>
                    </Dialog>
                    <Calendar data={this.state.data.calendars[this.state.calendarId]} changeMonth={this.changeMonth.bind(this)} newEvent={this.newEvent.bind(this)} editEvent={this.editEvent.bind(this)} deleteEvent={this.deleteEvent.bind(this)} date={this.state.date}/>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
