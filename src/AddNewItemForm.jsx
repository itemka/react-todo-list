import React from "react";
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: '',
    };

    onChangeInput = (event) => {
        console.dir(this.state.title);
        this.setState({error: false, title: event.currentTarget.value})
    };

    onAddTaskClick = () => {
        let title = this.state.title;
        this.state.title = '';
        if (title === '' || title === null || title === undefined) {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addTask(title)
        }
    };

    onKeyPress = e => {
        if (e.key === "Enter") {
            this.onAddTaskClick();
        }
    };

    render = () => {
        let classError = this.state.error === true ? `error` : '';
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.onKeyPress} type="text" onChange={this.onChangeInput} className={classError}
                           placeholder="New task name" value={this.state.title}/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>

        );
    }
}

export default TodoListHeader