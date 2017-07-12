import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import FontAwesome from 'react-fontawesome';
import '../styles/EventFormSchedule.css';

class EventFormSchedule extends Component {

    constructor(props) {

        super(props);

        let schedule = [];
        if (this.props.format == "week") {
            schedule = [
                {
                    name: 'Sun',
                    times: []
                }, {
                    name: 'Mon',
                    times: []
                }, {
                    name: 'Tue',
                    times: []
                }, {
                    name: 'Wed',
                    times: []
                }, {
                    name: 'Thu',
                    times: []
                }, {
                    name: 'Fri',
                    times: []
                }, {
                    name: 'Sat',
                    times: []
                }
            ];
            this.props.days.forEach(day => {
                console.log(day);
                day.days_of_week.forEach(dayOfWeek => {
                    schedule[Number(dayOfWeek)].times.push({start: day.start_time, end: day.end_time});
                });
            });
        } else if (this.props.format == "dates") {
            this.props.days.forEach(day => {
                schedule.push({
                    name: day.date,
                    times: [
                        {
                            start: day.start_time,
                            end: day.end_time
                        }
                    ]
                });
            });
        }

        this.state = {

            dialogActive: false,
            dialogTarget: [
                null, null
            ],
            dialogStartTime: "00:00",
            dialogEndTime: "23:59",
            dialogTitle: "New Event Time",
            schedule,
            openDatePicker: -1

        };

    }

    datePickers = [];

    dialogActions = [
        {
            label: "Cancel",
            onClick: this.discardDialog.bind(this)
        }, {
            label: "Save",
            onClick: this.saveDialog.bind(this)
        }
    ];

    handleChange = (name, value) => {

        this.setState({[name]: value});

    };

    removeDate = (dayIndex) => {

        let schedule = this.state.schedule;
        schedule.splice(dayIndex, 1);
        this.setState({schedule});

    }

    newDate = () => {
        console.log('newDate');
        let schedule = this.state.schedule;
        schedule.push({name: '', times: []});
        this.setState({
            schedule,
            openDatePicker: schedule.length - 1
        });
    }

    handleDateChange = (dayIndex, value) => {
        let schedule = this.state.schedule;
        schedule[dayIndex].name = value;
        this.setState({schedule, openDatePicker: -1});
    }

    removeScheduleTime(targetIndex) {
        let [dayIndex,
                timeIndex] = targetIndex,
            schedule = this.state.schedule;
        schedule[dayIndex].times.splice(timeIndex, 1);
        this.setState({schedule});
    }

    setScheduleTimes(targetIndex, times) {
        let [dayIndex,
                timeIndex] = targetIndex,
            schedule = this.state.schedule;
        if (dayIndex == null) {
            schedule.push({times: [times]});
            this.setState({schedule});

        } else if (timeIndex == null) {
            schedule[dayIndex].times.push(times);
            this.setState({schedule});
        } else {
            schedule[dayIndex].times[timeIndex] = times;
            this.setState({schedule});
        }
    }

    getScheduleTimes(targetIndex) {
        let [dayIndex,
            timeIndex] = targetIndex;
        if (dayIndex == null || timeIndex == null) {
            return {start: '00:00', end: '23:59'};
        } else {
            return this.state.schedule[dayIndex].times[timeIndex];
        }

    }

    openDialog(targetIndex) {

        let times = this.getScheduleTimes(targetIndex),
            [dayIndex, timeIndex] = targetIndex;
        this.setState({
            dialogActive: true,
            dialogTarget: targetIndex,
            dialogStartTime: times.start,
            dialogEndTime: times.end,
            dialogTitle: (dayIndex == null || timeIndex == null)
                ? "New Event Time"
                : "Edit Event Time"
        });

    }

    discardDialog() {

        this.setState({
            dialogActive: false,
            dialogTarget: [
                null, null
            ],
            dialogStartTime: "00:00",
            dialogEndTime: "23:59",
            dialogTitle: "New Event Time"
        });

    }

    saveDialog() {
        let time = {
            start: this.state.dialogStartTime,
            end: this.state.dialogEndTime
        }
        this.setScheduleTimes(this.state.dialogTarget, time)
        this.discardDialog();

    }

    componentDidUpdate() {}

    render() {
        return (
            <div className="EventFormSchedule">

                {this.state.schedule.map((day, i) => {
                    return (
                        <div key={i} className="EventFormSchedule__day">
                            <div className="EventFormSchedule__day__name">
                                {this.props.format === "dates"
                                    ? <DatePicker label='Date' active={this.state.openDatePicker === i} sundayFirstDayOfWeek autoOk onChange={this.handleDateChange.bind(this, i)} value={day.name}/>
                                    : <Input type='text' label='Day of Week' name='dayOfWeek' value={day.name} disabled/>
                                }
                            </div>
                            <div className="EventFormSchedule__day__times">
                                {day.times.map((time, j) => {
                                    return (
                                        <div key={j} className="EventFormSchedule__day__time">
                                            <div className="EventFormSchedule__day__time__header">
                                                <button className="btn btn--circle btn--tiny" onClick={this.removeScheduleTime.bind(this, [i, j])} aria-label="Remove Time">
                                                    <FontAwesome name="times"/>
                                                </button>
                                            </div>
                                            <div className="EventFormSchedule__day__time__body" onClick={this.openDialog.bind(this, [i, j])} aria-label="Click to Edit">
                                                <p>{time.start}<br/> {time.end}
                                                    <br/>
                                                </p>
                                                (click to edit)
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="EventFormSchedule__day__footer">
                                <p><Button icon='add' floating primary mini onClick={this.openDialog.bind(this, [i, null])}/></p>
                                <br/><br/> {this.props.format == 'dates'
                                    ? (
                                        <div><Button icon='delete' label='Remove' accent mini raised onClick={this.removeDate.bind(this, i)}/></div>
                                    )
                                    : ''}
                            </div>

                        </div>
                    )
                })}
                {this.props.format == 'dates'
                    ? (
                        <div><Button icon='add' label='Add date' primary raised onClick={this.newDate.bind(this)}/></div>
                    )
                    : ''}
                <Dialog actions={this.dialogActions} active={this.state.dialogActive} onEscKeyDown={this.discardDialog.bind(this)} title={this.state.dialogTitle}>
                    <Input type='time' label='Start Time' name='startTime' value={this.state.dialogStartTime} onChange={this.handleChange.bind(this, 'dialogStartTime')}/>
                    <Input type='time' label='End Time' name='endTime' value={this.state.dialogEndTime} onChange={this.handleChange.bind(this, 'dialogEndTime')}/>
                </Dialog>
            </div>
        );
    }
}

EventFormSchedule.propTypes = {
    days: PropTypes.array,
    format: PropTypes.oneOf(["week", "dates"])
}

EventFormSchedule.defaultProps = {
    days: []
};

export default EventFormSchedule;
EventFormSchedule;