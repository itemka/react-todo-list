import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm/AddNewItemForm";
import axios from "axios";
import instance from "./api";

class App extends React.Component {

    nextItemId = 0;
    state = {
        todoLists: [
            // {id: 1, title: 'One'},
            // {id: 2, title: 'Two'},
            // {id: 3, title: 'awefaef'},
            // {id: 4, title: 'Twasgasgao'},
        ],
        title: '',
    };

    componentDidMount() {
        this.restoreState();
        this.setState({}, () => {
            //Метод(callback) передает i проверку
            let z = this.state.todoLists.reduce((i, item) => {
                if (i < item.id) {
                    return item.id;
                } else return i;
            }, -1);

            console.log(z);
            if (z !== 0 || z !== null) {
                return this.nextItemId = z + 1;
                // this.state.tasks[z-1].id + 1;
            } else return this.nextItemId = 0;
        });
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-stateGeneral", stateAsString);
    };

    restoreState = () => {
        let state = this.state;
        axios.get(
            "https://social-network.samuraijs.com/api/1.0/todo-lists",
            {withCredentials: true})
            .then(res => {
                // debugger
                // console.log(res.data)
                this.setState({todoLists: res.data});
            });
    };

    onAddNewGeneralTaskClick = (title) => {
        instance.post("todo-lists", {title: title})
            .then(res => {
                let todolist = res.data.data.item;
                this.setState({todoLists: [...this.state.todoLists, todolist]});
            });
    };

    _restoreState = () => {
        let state = {
            todoLists: [],
            title: '',
        };
        let stateAsString = localStorage.getItem("our-stateGeneral");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    _onAddNewGeneralTaskClick = (title) => {
        let newTodoList = {id: this.nextItemId, title: title};
        this.setState({todoLists: [...this.state.todoLists, newTodoList]}, () => this.saveState());
        this.nextItemId++;
    };

    render = () => {
        let mapTodoList = this.state.todoLists.map(item => <TodoList id={item.id} title={item.title}/>);

        return (
            <>
                <div className={`todoList`}>
                    <AddNewItemForm addItem={this.onAddNewGeneralTaskClick}/>
                </div>
                <div className={`flex`}>
                    {mapTodoList}
                </div>
            </>
        );
    }
}

export default App;

