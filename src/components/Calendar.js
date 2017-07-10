import React, {Component} from 'react';
import Month from './Month';
import '../styles/Calendar.css';

class Calendar extends Component {
    render() {
        return (
            <div className="Calendar">
                <div className="Calendar__header">
                    <span>Calendar__header</span>
                </div>
                <div className="Calendar__body">
                    <span>Calendar__body</span>
                    <Month/>
                </div>
            </div>
        );
    }
}

export default Calendar;
