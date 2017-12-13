import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
	loadTasks,
	addTask
} from '../actions/index';
import Task from './Task';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addTask = this.addTask.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
    	dispatch(loadTasks());
  	}

  	addTask() {
  		const { dispatch } = this.props;
  		dispatch(addTask());
  	}

  	componentWillUpdate() {
  		console.log("Component updated");
  	}

	render() {
		const { tasks } = this.props;
		return (
			<div className="page">
				<div className="header"></div>
				<div className="content">
					<div className="content-header">
						<h2>Tasks</h2>
						<button type="button" className="add-task" onClick={this.addTask}>Add Task</button>
						<button type="button" className="save">Save</button>  
					</div>
					<Task />
				</div>
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	tasks: PropTypes.arrayOf(
    	PropTypes.shape({
      		id: PropTypes.number.isRequired,
      		isFocused: PropTypes.bool.isRequired,
      		name: PropTypes.string.isRequired
    	})
  	),
	isLoadingTasks: PropTypes.bool,
	isSaveBtnEnabled: PropTypes.bool,
	notification: PropTypes.string
}

function mapStateToProps(state) {
	const {
		isLoadingTasks,
		isSaveBtnEnabled,
		notification
	} = state;

	return {
		isLoadingTasks,
		isSaveBtnEnabled,
		notification		
	}
}

export default connect(mapStateToProps)(App);