import {Component} from 'react';
import './employers-add-form.css';

class EmployersAddForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name : '',
            salary: 0
        }
    }

    onValueChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    addNewPerson = (e) => {
        e.preventDefault();
        if (this.state.name.length < 3 || this.state.salary <= 0){
            alert('Check your name or salary. Retry'); 
            return;
        } else 
            this.props.onAdd(this.state.name,this.state.salary);
    }

    render () {
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                        <input type="text"
                            className="form-control new-post-label"
                            placeholder="Как его зовут?" 
                            name="name"
                            value={this.state.name}
                            onChange={this.onValueChange}
                            />
                            
                            
                            <input type="number"
                                className="form-control new-post-label"
                                placeholder="З/П в $?" 
                                name="salary"
                                value={this.state.salary}
                                onChange={this.onValueChange}
                                />
    
                    <button type="submit"
                            className="btn btn-outline-light"
                            onClick = {this.addNewPerson}
                            >Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;