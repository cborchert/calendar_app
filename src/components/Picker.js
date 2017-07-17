import React, {Component} from 'react';
import List from 'react-toolbox/lib/list/List';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import Input from 'react-toolbox/lib/input/Input';
import '../styles/Picker.css';

class Picker extends Component {

    constructor(props) {
        super(props);

        let availableItems = [],
            selectedItems = [];
        this.props.items.forEach(item => {
            let itemInSelected = false;
            if( this.props.selectedItems ) {
                //SelectedItems is just an array of Ids
                this.props.selectedItems.forEach(selectedItem => {
                    if (item.id == selectedItem) {
                        itemInSelected = true;
                    }
                });
            }
            if (itemInSelected) {
                selectedItems.push(item);
            } else {
                availableItems.push(item);
            }
        });
        this.state = {
            items: this.props.items,
            available: availableItems,
            selected: selectedItems,
            selectedSearch: '',
            availableSearch: ''
        };

    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

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
        let selectedIds = [];
        if (selected) {
            this.setState({available: fromList, selected: toList});
            toList.forEach(item=>{
                selectedIds.push(item.id);
            });
        } else {
            this.setState({available: toList, selected: fromList});
            fromList.forEach(item=>{
                selectedIds.push(item.id);
            });
        }

        this.props.onSelectedChange(selectedIds);

    }

    render() {

        let available = this.state.available.filter(element => {
                if (this.state.availableSearch === '') {
                    return true;
                } else {
                    return ((String(element.title).toLowerCase().indexOf(this.state.availableSearch.toLowerCase()) > -1) || (String(element.content).toLowerCase().indexOf(this.state.availableSearch.toLowerCase()) > -1));
                }
            }).map(element => {
                return (<ListCheckbox className="Picker__list-item" key={element.id} checked={false} caption={element.title} onChange={this.setItemSelected.bind(this, element.id, true)}/>);
            }),
            selected = this.state.selected.filter(element => {
                if (this.state.selectedSearch === '') {
                    return true;
                } else {
                    return ((String(element.title).toLowerCase().indexOf(this.state.selectedSearch.toLowerCase()) > -1) || (String(element.content).toLowerCase().indexOf(this.state.selectedSearch.toLowerCase()) > -1));
                }
            }).map(element => {
                return (<ListCheckbox className="Picker__list-item" key={element.id} checked={true} caption={element.title} onChange={this.setItemSelected.bind(this, element.id, false)}/>);
            });

        return (

            <div className="Picker">
                <div className="Picker__header">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="Picker__body">
                    <div className="Picker__pane Picker__selected">
                        <h3>Selected</h3>
                        <Input type='text' icon="search" label='Search Selected' name='search-selected' value={this.state.selectedSearch} onChange={this.handleChange.bind(this, 'selectedSearch')}/>
                        <List selectable ripple>
                            {selected}
                        </List>
                        <div>
                            <em>{`Showing ${selected.length} of ${this.state.selected.length} items`}</em>
                        </div>
                    </div>
                    <div className="Picker__pane Picker__available">
                        <h3>Available</h3>
                        <Input type='text' icon="search" label='Search Available' name='search-available' value={this.state.availableSearch} onChange={this.handleChange.bind(this, 'availableSearch')}/>
                        <List selectable ripple>
                            {available}
                        </List>
                        <div>
                            <em>{`Showing ${available.length} of ${this.state.available.length} items`}</em>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Picker;
