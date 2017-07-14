import React, {Component} from 'react';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import '../styles/Picker.css';

class Picker extends Component {

    constructor(props) {
        super(props);

        this.state = {

            items: this.props.items,
            available: this.props.items,
            selected: [],
            searchValue: ''

        };

    }

    componentWillReceiveProps(newProps) {

        //compare the new props with what's in state.available and selected.
        //Any items that exist in selected that no longer exist get thrown out.
        //Any items that are in selected get put in available
        let selected = this.state.selected,
            newSelected = [],
            newAvailable = [];
        newProps.items.forEach(newItem => {
            let itemInSelected = false;
            selected.forEach(selectedItem => {
                if (newItem.id == selectedItem.id) {
                    itemInSelected = true;
                }
            });
            if (itemInSelected) {
                newSelected.push(newItem);
            } else {
                newAvailable.push(newItem);
            }
        });

        this.setState({available: newAvailable, selected: newSelected});

    }

    setItemSelected(id, selected) {
        let availableItems = this.state.available,
            selectedItems = this.state.selected,
            fromList = selected
                ? availableItems
                : selectedItems,
            toList = selected
                ? selectedItems
                : availableItems,
            results = fromList.filter(function(item) {
                return item.id === id;
            });

        if (results.length > 0) {
            let target = results[0];
            fromList = fromList.filter(function(item) {
                return item.id !== id;
            });
            toList.push(target);
        }
        if (selected) {
            this.setState({available: fromList, selected: toList});
        } else {
            this.setState({available: toList, selected: fromList});
        }

    }

    render() {
        return (

            <div className="Picker">
                <div className="Picker__header">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="Picker__body">
                    <div className="Picker__pane Picker__selected">
                        <h3>Selected</h3>
                        <List selectable ripple>
                            {this.state.selected.map(element => {
                                return (<ListCheckbox className="Picker__list-item" key={element.id} checked={true} caption={element.title} onChange={this.setItemSelected.bind(this, element.id, false)}/>);
                            })}
                        </List>
                    </div>
                    <div className="Picker__pane Picker__available">
                        <h3>Available</h3>
                        <List selectable ripple>
                            {this.state.available.map(element => {
                                return (<ListCheckbox className="Picker__list-item" key={element.id} checked={false} caption={element.title} onChange={this.setItemSelected.bind(this, element.id, true)}/>);
                            })}
                        </List>
                    </div>
                </div>

            </div>

        );
    }
}

export default Picker;
