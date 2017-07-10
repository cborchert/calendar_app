import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/Day.css';

class Day extends Component {

    render() {
        let classes = 'Day';
        if (this.props.isHeader)
            classes += ' Day--header';

        return (
            <div key={this.props.key} className={classes}>
                <div className="Day__date"></div>
                <div className="Day__date--short">{this.props.date}</div>
                <div className="Day__inner-text">{this.props.innerText}</div>
                <div className="Day__events">
                    <div className="Event"></div>
                </div>
            </div>
        );
    }
}

Day.propTypes = {
    innerText: PropTypes.string,
    isHeader: PropTypes.bool,
    date: PropTypes.string,
    uniqueId: PropTypes.number
}

Day.defaultProps = {
    innerText: '',
    isHeader: false,
    date: '',
    uniqueId: 0
}
export default Day;
