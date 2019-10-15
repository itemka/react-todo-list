import React from "react";
import './App.css';

class TodoListTask extends React.Component {

    state = {
        editMode: true,
    };
    onIsDoneChange = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };


    activateEditMode = () => {
        this.setState({editMode: !this.state.editMode});
    };
    diactivateEditMode = () => {
        this.setState({editMode: !this.state.editMode});
    };

    onTitleChange = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    render = (props) => {
        let priority = '';
        switch (this.props.task.priority) {
            case 0: priority = 'Low';
                break;
            case 1: priority = 'Middle';
                break;
            case 2: priority = 'Hi';
                break;
            case 3: priority = 'Urgently';
                break;
            case 4: priority = 'Later';
                break;
            default: priority = '';
        }

        let done = this.props.task.isDone ? "todoList-task-done" : "todoList-task";
        return (
            <div className={done}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChange}/>
                {this.state.editMode
                    ? <span onClick={this.activateEditMode}>{`${this.props.task.title}`}ç</span>
                    : <input autoFocus={true} onBlur={this.diactivateEditMode} onChange={this.onTitleChange} value={this.props.task.title}/>
                }, priority - {priority}
            </div>
        );
    }
}
export default TodoListTask;