import React, {Component} from 'react';
import data from './data';
import Calendar from './components/Calendar';
import logo from './logo.svg';
import './App.css';

//TODO: dates in events should be in unix time or something that does not require conversion
//TODO: Preprocess Events: events should not have php keys or unnecessary keys.
class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    <code>src/App.js</code>
                    and save to reload.
                </p>
                <Calendar data={data.calendars[0]}/>
            </div>
        );
    }
}

export default App;
