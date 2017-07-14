import React, {Component} from 'react';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import PropTypes from 'prop-types';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import '../styles/Event.css';

class Event extends Component {

    constructor(props) {

        super(props);
        this.state = {
            deleteDialogActive: false
        };
    }

    dialogActions = [
        {
            label: "Cancel",
            onClick: this.discardDeleteDialog.bind(this)
        }, {
            label: "Delete",
            onClick: this.confirmDeleteDialog.bind(this)
        }
    ];

    openDeleteDialog() {
        this.setState({deleteDialogActive: true});
    }

    discardDeleteDialog() {
        this.setState({deleteDialogActive: false});
    }

    confirmDeleteDialog() {
        this.setState({deleteDialogActive: false});
        this.deleteEvent();
    }

    editEvent() {
        this.props.editEvent(this.props.data.meta.type, this.props.data.meta.index);
    }

    deleteEvent() {
        this.props.deleteEvent(this.props.data.meta.type, this.props.data.meta.index);
    }

    //TODO: cancelEvent
    render() {
        return (
            <div className="Event">
                <div className="Event__header">
                    <IconMenu icon='more_vert' position='auto' className="Event__menu" menuRipple>
                        <MenuItem className="Event__menu__item" value='edit' icon='edit' caption='Edit Event' onClick={this.editEvent.bind(this)}/>
                        <MenuDivider/>
                        <MenuItem className="Event__menu__item" value='delete' icon='delete' caption='Delete Event' onClick={this.openDeleteDialog.bind(this)}/>
                    </IconMenu>
                </div>
                <p>{this.props.data.title}</p>
                <p>{this.props.data.times.start}</p>
                <p>{this.props.data.times.end}</p>
                <Dialog type="small" actions={this.dialogActions} active={this.state.deleteDialogActive} onEscKeyDown={this.discardDeleteDialog.bind(this)} title="Are you sure you want to delete this event?">
                    <p>This event, and
                        <strong>&nbsp;all&nbsp;</strong>
                        scheduled times of this event will be lost forever</p>
                </Dialog>
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
