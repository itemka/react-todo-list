import React from "react";
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        const tasksElements = this.props.tasks.map(item => (
            <TodoListTask changeStatus={this.props.changeStatus} changeTitle={this.props.changeTitle} task={item}/>)
        );

        return (
            <div className='todoList-task'>
                {tasksElements}
            </div>
        )
    }
}

export default TodoListTasks