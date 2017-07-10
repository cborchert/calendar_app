import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import '../styles/Month.css';

class Month extends Component {
    render() {
        let weekDayNames = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ];
        let daysInMonth = new Date(this.props.year, this.props.month, 0).getDate();
        //The following will return the day (number of week of the first of the month)
        //Will be used to cushion the first week
        let firstDateDay = new Date(this.props.year, this.props.month, 1).getDay();

        let weeks = [];
        let dayInWeekCounter = 0;
        let dayCounter = Number(String(this.props.year) + String(this.props.month)) * 100;

        //Form the first week
        let week = [];
        for (let i = 0; i < firstDateDay; i++) {
            week.push((<Day uniqueId={dayCounter}/>));
            dayInWeekCounter++;
            dayCounter++;
        }

        //Form the rest of the days
        for (let i = 1; i <= daysInMonth; i++) {
            week.push((<Day uniqueId={dayCounter} date={String(i)}/>));
            dayInWeekCounter++;
            dayCounter++;
            if (dayInWeekCounter % 7 === 0 || i === daysInMonth) {
                weeks.push(week);
                week = [];
            }
        }

        return (
            <div className="Month">
                <div className="Month__header">
                    <button>Back</button>
                    <span>Month Name</span>
                    <button>Next</button>
                </div>
                <div className="Month__body">
                    <div className="Month__body__header">
                        <div className="Month__week Month__week--header">
                            {weekDayNames.map((dayName, i) => {
                                return (<Day uniqueId={i} innerText={dayName} isHeader={true}/>);
                            })}
                        </div>
                    </div>
                    {weeks.map(week => {
                        return (
                            <div className="Month__week">
                                {week.map(day => day)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

Month.propTypes = {
    month: PropTypes.number,
    year: PropTypes.number,
}

Month.defaultProps = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
}

export default Month;
