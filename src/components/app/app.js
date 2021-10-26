import { Component } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFiler from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

class App extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [
                    {name: 'Anatoliy P.', salary: 1000, increase: false, rise: true, id: 1},
                    {name: 'Petrov G.', salary: 750, increase: true, rise: false, id: 2}, 
                    {name: 'Vasilyev M.', salary: 1200, increase: true, rise: false, id: 3}
                ],
                term: '',
                filter: 'all'
            }
            this.maxId = 4;
        }

        deleteItem = (id) => {
            this.setState(({data}) => {
                return {
                    data: data.filter(el => el.id !== id)
                }
            })
        }

        addItem = (name, salary) => {
            const newItem = {name,salary,increase:false, rise:false, id: this.maxId};
            this.setState(({data}) => {
                return {
                    data: [...data, newItem]
                }
            })
        }

        onToggleIncrease = (id) => {
            this.setState(({data}) => ({
                data: data.map(item => {
                    if(item.id === id) return {...item, increase: !item.increase}
                    return item;
                })
            }))
        }

        onToggleRise = (id) => {
            this.setState(({data}) => ({
                data: data.map(item => {
                    if(item.id === id) return {...item, rise: !item.rise}
                    return item;
                })
            }))
        }

        searchEmp = (items, term) => {
            if (term.length === 0) return items;

            return items.filter(el => el.name.indexOf(term) > -1);
        }

        onUpdateSearch = (term) => {
            this.setState ({term:term})
        }

        filterPost = (items, filter) => {
            switch (filter) {
                case 'rise': 
                    return items.filter(el => el.rise) 
                case 'moreThan1000':
                    return items.filter(el => el.salary >= 1000)
                default:
                    return items;
            }
        }

        onFilterSelect = (filter) => {
            this.setState ({filter});
        }


        render () {
            const employees = this.state.data.length;
            const increased = this.state.data.filter(el => el.increase).length;
            const {data, term, filter} = this.state; 
            const visibleData = this.filterPost(this.searchEmp(data,term), filter);
            

            return (
                <div className = "app">
                    <AppInfo 
                    employees = {employees}
                    increased = {increased}
                    ></AppInfo>
        
                    <div className="search-panel">
                        <SearchPanel
                            onUpdateSearch = {this.onUpdateSearch}
                        ></SearchPanel>
                        <AppFiler
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}
                        ></AppFiler>
                    </div>
        
        
                    <EmployersList 
                    data = {visibleData}
                    onDelete = {this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                    ></EmployersList>

                    <EmployersAddForm 
                    data = {data}
                    onAdd = {this.addItem}
                    ></EmployersAddForm>
                </div>
                )
        }
    }

export default App;