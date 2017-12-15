import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
	loadTasks,
	addTask,
	editTask,
	deleteTask,
	saveTasks,
	removeNotification	
} from '../actions/index';
import Task from './Task';
import Notification from './Notification';

class App extends React.Component {
	constructor(props) {
		super(props);
		this._handleAddTaskBtn = this._handleAddTaskBtn.bind(this);
		this._handleSaveTasksBtn = this._handleSaveTasksBtn.bind(this);
		this._removeNotification = this._removeNotification.bind(this);
		this.timer;
	}

	componentDidMount() {
		this.props.dispatchLoadTasks();
  	}

  	_removeNotification() {
  		const { dispatchRemoveNotification } = this.props;
  		dispatchRemoveNotification();
  	}

  	_handleAddTaskBtn() {
  		this.props.dispatchAddTask();
  	}

  	_handleSaveTasksBtn() {
  		const { tasks, dispatchSaveTasks } = this.props;
  		dispatchSaveTasks(tasks);
  	}

	render() {
		const { 
			tasks, 
			dispatchEditTask, 
			dispatchDeleteTask,
			dispatchRemoveNotification,
			notification, 
			isSaveBtnEnabled,
			errorNotification,
			isLoadingTasks 
		} = this.props;
		return (
			<div className="page">
				<div className="header"></div>
				<div className="content">
					<div className="content-header">
						<h2>Tasks</h2>
						<button type="button" className="save-tasks" disabled={ !isSaveBtnEnabled } onClick={ this._handleSaveTasksBtn }>Save</button>
						<button type="button" className="add-task" onClick={ this._handleAddTaskBtn }>Add Task</button>
					</div>
					<ol>
						{ tasks && tasks.map(function(task) {
							const taskId = `task_${task.id}`;
							return <Task key={task.id}
								taskId={taskId} 
								data={task} 
								editTask={(task) => dispatchEditTask(task)} 
								deleteTask={(taskId) => dispatchDeleteTask(taskId)}
							/>;
						  })
						}
					</ol>
					{ !tasks.length && !isLoadingTasks && <div className="empty-tasks">Your tasks list is empty.</div>}
				</div>
				{ notification && <Notification 
					text={notification} 
					removeNotification={this._removeNotification}
					errorNotification={errorNotification}
				  /> 
				}
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array,
	isLoadingTasks: PropTypes.bool,
	isSaveBtnEnabled: PropTypes.bool,
	notification: PropTypes.string,
	errorNotification: PropTypes.bool,
	dispatchLoadTasks: PropTypes.func,
	dispatchAddTask: PropTypes.func,
	dispatchEditTask: PropTypes.func,
	dispatchSaveTasks: PropTypes.func,
	dispatchDeleteTask: PropTypes.func,
	dispatchRemoveNotification: PropTypes.func
};

function mapStateToProps(state) {
	const {
		isLoadingTasks,
		isSaveBtnEnabled,
		notification,
		tasks,
		errorNotification
	} = state.tasks;

	return {
		isLoadingTasks,
		isSaveBtnEnabled,
		notification,
		tasks,
		errorNotification		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchLoadTasks: function() {return dispatch(loadTasks());},
		dispatchAddTask: function() {return dispatch(addTask());},
		dispatchEditTask: function(task) {return dispatch(editTask(task));},
		dispatchDeleteTask: function(taskId) {return dispatch(deleteTask(taskId));},
		dispatchSaveTasks: function(tasks) {return dispatch(saveTasks(tasks));},
		dispatchRemoveNotification: function() {return dispatch(removeNotification());}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);