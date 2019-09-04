import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader/TodoListHeader'
import TodoListFooter from './TodoListFooter'
import TodoListTasks from './TodoListTasks'
import axios from "axios";
import instance from "./api";

class TodoList extends React.Component {

    //Восстановление state-а мы будем делать в специальном методе жизненного цикла (главный метод,
    // запоминайте его на всю жизнь) - методе ​componentDidMount (​он срабатывает один раз, в момент,
    // когда компонента отрисовалась)
    componentDidMount() {

        this.restoreState();

        this.setState({}, () => {
            //Лучше это использовать, чем нижний
            // this.state.tasks.forEach(item=>{
            //     if (item.id >= this.nextTaskId){
            //         this.nextTaskId = item.id +1;
            //     }
            // });

            //Метод(callback) передает i проверку
            let z = this.state.tasks.reduce((i, item) => {
                if (i < item.id) {
                    return item.id;
                } else return i;
            }, -1);

            console.log(z);
            if (z !== 0 || z !== null) {
                return this.nextTaskId = z + 1;
                // this.state.tasks[z-1].id + 1;
            } else return this.nextTaskId = 0;


        });
    }

    nextTaskId = 0;
    state = {
        tasks: [
            // {id: 0, title: 'JS', isDone: true, priority: "medium"},
            // {id: 1, title: 'HTML', isDone: true, priority: "low"},
            // {id: 2, title: 'CSS', isDone: true, priority: "low"},
            // {id: 3, title: 'React', isDone: false, priority: "high"},
        ],
        filterValue: "All"
    };

    //Давайте добавим в App метод, который будет брать текущий стейт и... сохранять его в localStorage,
    // и метод, который будет брать данные из localStorage и устанавливать его как state:
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString);
    };

    restoreState = () => {
        let state = this.state;
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            {withCredentials: true}
        )
            .then(res => {
                this.setState({tasks: res.data.items});
            });
    };

    addTask = (newText) => {
        // axios.post(
        //     `https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
        //     {title: newText},
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "326adc8b-48be-4905-a33d-14875af1c491"}
        //     }
        // )
        instance.post(`todo-lists/${this.props.id}/tasks`, {title: newText})
            .then(res => {
                let newTacks = res.data.data.item;
                this.setState({tasks: [...this.state.tasks, newTacks]});
            });
    };

    _restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem("our-state" + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };
    //Видим только одну таску??? Всегда будем видеть на 1 таску меньше. Это потому, что метод t​his.setState -​асинхронный!!!
    // Это значит, что когда мы запускаем этот метод, он не меняет стейт мгновенно, а делает это ПОТОМ...
    // Соответственно в момент, когда мы делаем t​his.saveState(), т​о стейт там ещё старый (предыдущий скажем так)..
    // и новый стейт не устанавливается.
    // Для этой и других целей, если нам нужно что-то сделать в момент, когда state ​ТОЧНО будет ​обновлен,
    // у метода setState есть второй параметр - колбэк, который сработает
    // тогда, когда стейт ТОЧНО обновится. И вот в нём мы можем вызвать наш ​saveState:

    _addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        let newTacks = [...this.state.tasks, newTask];
        this.setState({tasks: newTacks}, () => this.saveState());
        // console.log(this.state.tasks.length-1);
    };


    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => this.saveState())
    };


    //Общий для всех изменений
    changeTask = (taskId, object) => {
        let newTasks = this.state.tasks.map(item => {
            if (item.id !== taskId) {
                return item;
            } else {
                return {...item, ...object};
            }
        });
        this.setState({tasks: newTasks}, () => this.saveState());
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    };
    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle});
    };


    render = () => {
        return (
            <div className="App">
                <div className="todoList">

                    <TodoListHeader addTask={this.addTask} title={this.props.title}/>
                    <TodoListTasks changeStatus={this.changeStatus} changeTitle={this.changeTitle}
                                   tasks={this.state.tasks.filter(item => {
                                       if (this.state.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.state.filterValue === "Active") {
                                           return item.isDone === true;
                                       }
                                       if (this.state.filterValue === "Completed") {
                                           return item.isDone === false;
                                       }
                                   })}/>
                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}/>

                </div>
            </div>
        );
    }
}

export default TodoList;

