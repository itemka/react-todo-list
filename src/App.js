import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm/AddNewItemForm";

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
        this.setState({},()=>{
            //Метод(callback) передает i проверку
            let z = this.state.todoLists.reduce( (i, item) => {
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

    onAddNewGeneralTaskClick = (title) => {
        let newTodoList = {id: this.nextItemId, title: title};
        this.setState({todoLists: [...this.state.todoLists, newTodoList]}, ()=>this.saveState())
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

