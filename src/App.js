import React, {Component} from 'react';
//Get react toolbox working
import theme from './assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import './assets/react-toolbox/theme.css';
import 'material-design-icons/iconfont/material-icons.css';
import data from './data';
import Calendar from './components/Calendar';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.css';
import './styles/common.css';

//TODO: dates in events should be in unix time or something that does not require conversion
//TODO: Preprocess Events: events should not have php keys or unnecessary keys.
class App extends Component {

    constructor() {
        super();
        let date = new Date();
        this.state = {
            date: new Date(date.getFullYear(), date.getMonth(), 1),
            data: data,
            calendarId: 0
        };
    }

    changeMonth(direction) {
        let date = this.state.date;
        date.setMonth(date.getMonth() + direction);
        this.setState({date});

    }

    addEvent(event) {

        this.state.data.calendars[this.state.calendarId].events.push(event);
        this.setState();

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">

                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <Calendar data={this.state.data.calendars[this.state.calendarId]} changeMonth={this.changeMonth.bind(this)} date={this.state.date}/>

                </div>
            </ThemeProvider>
        );
    }
}

export default App;
