import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            whichData: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term:term, whichData: true});
        this.props.onUpdateSearch(term,this.state.whichData);
    }

    render () {
        return (
            <input 
            type="text" 
            className="form-control search-input"
            placeholder="Найти сотрудника"
            onChange={this.onUpdateSearch}
        />
        )
    }
}

export default SearchPanel;