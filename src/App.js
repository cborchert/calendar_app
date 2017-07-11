import React, {Component} from 'react';
import data from './data';
import Calendar from './components/Calendar';
import logo from './logo.svg';
import './App.css';

//TODO: dates in events should be in unix time or something that does not require conversion
//TODO: Preprocess Events: events should not have php keys or unnecessary keys.
class App extends Component {

    constructor() {
        super();
        let date = new Date();
        this.state = {
            date: new Date(date.getFullYear(), date.getMonth(), 1)
        };
    }

    changeMonth(direction) {
        console.log(this);
        let date = this.state.date;
        date.setMonth(date.getMonth() + direction);
        this.setState({date});

    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to the React Calendar Project</h2>
                </div>
                <Calendar data={data.calendars[0]} changeMonth={this.changeMonth.bind(this)} date={this.state.date}/>
            </div>
        );
    }
}

export default App;
