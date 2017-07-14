import React, {Component} from 'react';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import PropTypes from 'prop-types';
import '../styles/Event.css';

class Event extends Component {

    editEvent() {
        this.props.editEvent(this.props.data.meta.type, this.props.data.meta.index);
    }

    render() {
        return (
            <div className="Event">
                <div className="Event__header">
                    <IconMenu icon='more_vert' position='auto' className="Event__menu" menuRipple>
                        <MenuItem className="Event__menu__item" value='edit' icon='edit' caption='Edit Event' onClick={this.editEvent.bind(this)}/>
                        <MenuDivider />
                        <MenuItem className="Event__menu__item" value='cancel' icon='alarm_off' caption='Cancel Event' />
                        <MenuItem className="Event__menu__item" value='delete' icon='delete' caption='Delete Event' />
                    </IconMenu>
                </div>
                <p>{this.props.data.title}</p>
                <p>{this.props.data.times.start}</p>
                <p>{this.props.data.times.end}</p>
            </div>
        );
    }

};

Event.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        slug: PropTypes.string,
        status: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        //calendar_color: PropTypes.string,
        //calendar_name: PropTypes.string,
        //recurrence_type: PropTypes.oneOf(["date_list", "weekly"]),
        recurring_date_list: PropTypes.arrayOf(PropTypes.shape({days_of_week: PropTypes.array, start_time: PropTypes.string, end_time: PropTypes.string})),
        exceptions: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.string, start_time: PropTypes.string, end_time: PropTypes.string})),
        date_list: PropTypes.arrayOf(PropTypes.shape({date: PropTypes.date, start_time: PropTypes.string, end_time: PropTypes.string}))
    })
};

export default Event;
