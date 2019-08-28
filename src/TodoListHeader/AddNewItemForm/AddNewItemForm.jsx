import React from "react";
import '../../App.css';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        valueInput: '',
    };

    onChangeInput = (event) => {
        console.dir(this.state.valueInput);
        this.setState({error: false, valueInput: event.currentTarget.value})
    };

    onAddTaskClick = () => {
        let valueInput = this.state.valueInput;
        this.state.valueInput = '';
        if (valueInput === '' || valueInput === null || valueInput === undefined) {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addItem(valueInput)
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
            <div className="todoList-newTaskForm">
                <input onKeyPress={this.onKeyPress} type="text" onChange={this.onChangeInput} className={classError}
                       placeholder="New task name" value={this.state.valueInput}/>
                <button onClick={()=>this.onAddTaskClick()}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;