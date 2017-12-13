import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
	loadTasks,
	addTask,
	editTask,
	deleteTask
} from '../actions/index';
import Task from './Task';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadTasks();
  	}

  	componentWillReceiveProps(nextProps) {
  		console.log(nextProps);
  	}

	render() {
		const { tasks, handleAddTask, handleEditTask, handleDeleteTask } = this.props;
		return (
			<div className="page">
				<div className="header"></div>
				<div className="content">
					<div className="content-header">
						<h2>Tasks</h2>
						<button type="button" className="add-task" onClick={handleAddTask}>Add Task</button>
						<button type="button" className="save">Save</button>  
					</div>
					{ tasks && tasks.map(function(task) {
						const taskId = `task_${task.id}`;
						return <Task key={task.id}
							taskId={taskId} 
							data={task} 
							editTask={(task) => handleEditTask(task)} 
							deleteTask={(taskId) => handleDeleteTask(taskId)}
						/>;
					  })
					}
				</div>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array,
	isLoadingTasks: PropTypes.bool,
	isSaveBtnEnabled: PropTypes.bool,
	notification: PropTypes.string,
	loadTasks: PropTypes.func,
	handleAddTask: PropTypes.func,
	handleEditTask: PropTypes.func
};

function mapStateToProps(state) {
	const {
		isLoadingTasks,
		isSaveBtnEnabled,
		notification,
		tasks
	} = state.tasks;

	return {
		isLoadingTasks,
		isSaveBtnEnabled,
		notification,
		tasks		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadTasks: function() {return dispatch(loadTasks());},
		handleAddTask: function() {return dispatch(addTask());},
		handleEditTask: function(task) {return dispatch(editTask(task));},
		handleDeleteTask: function(taskId) {return dispatch(deleteTask(taskId));}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);