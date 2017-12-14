import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
		};
		this.blurInput = this.blurInput.bind(this);
		this._editTask = this._editTask.bind(this);
		this._deleteTask = this._deleteTask.bind(this);
	}

	componentWillMount() {
		if(!this.props.data.name) {
			this.setState({ isFocused: true });
		}	
	}

	componentDidMount() {
		if(this.state.isFocused) {
			this.textInput.focus();
		}
	}

	componentDidUpdate() {
		if(this.state.isFocused) {
			this.textInput.focus();
		}
	}

	blurInput(event) {
		const name = event.target.value.length ? event.target.value : `New task ${this.props.data.id}`;
		this.setState({ 
			isFocused: false, 
		});
		if(name !== this.props.data.name) {
			const task = {
				id: this.props.data.id,
				name
			};
			this.props.editTask(task);
		}
	}

	_editTask(event) {
		this.setState({ isFocused: true});
	}

	_deleteTask(event) {
		this.props.deleteTask(this.props.data.id);
	}

	render() {
		const { isFocused } = this.state;
		const { taskId } = this.props;
		const { name } = this.props.data;
		return (
			<li id={ taskId } className="task">
				{ isFocused ?
					<input ref={ (input) => { this.textInput = input } } 
						type="text" placeholder="Enter new task..." 
						onBlur={ this.blurInput }
						defaultValue={ name }
					/> :
					<div>
						<p className="task-name" onClick={ this._editTask }>
							{name.toUpperCase()}
						</p>
						<span className="delete-task fa fa-trash-o" onClick={ this._deleteTask }></span>
					</div>
				}
			</li>
		);
	}
}

Task.propTypes = {
	taskId: PropTypes.string.isRequired,
	data: PropTypes.shape({
  		id: PropTypes.number.isRequired,
  		name: PropTypes.string.isRequired
    }),
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default Task;