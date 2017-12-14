const name = 'nmehta';
const url = `http://cfassignment.herokuapp.com/${name}/tasks`;

export const LOAD_TASK_REQUEST = 'LOAD_TASK_REQUEST';
export const LOAD_TASK_RESPONSE = 'LOAD_TASK_RESPONSE';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const SAVE_TASKS_REQUEST = 'SAVE_TASKS_REQUEST';
export const SAVE_TASKS_RESPONSE = 'SAVE_TASKS_RESPONSE';

const loadTaskRequest = () => {
  return {
    type: LOAD_TASK_REQUEST
  };
};

const loadTaskResponse = (response) => {
	return {
		type: LOAD_TASK_RESPONSE,
		response
	};
};

export const addTask = () => {
	return {
		type: ADD_TASK,
	};
};

export const editTask = (task) => {
	return {
		type: EDIT_TASK,
		task
	};
};

export const deleteTask = (taskId) => {
	return {
		type: DELETE_TASK,
		taskId
	};
};

export const removeNotification = () => {
	return {
		type: REMOVE_NOTIFICATION
	};
};

const saveTasksRequest = (tasks) => {
	return {
		type: SAVE_TASKS_REQUEST,
		tasks
	};
};

const saveTasksResponse = (response) => {
	return {
		type: SAVE_TASKS_RESPONSE,
		response
	};
};

export function loadTasks() {
	return dispatch => {
		dispatch(loadTaskRequest());
		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(loadTaskResponse(json)))
			.catch(function(err) {
				console.log(err);
			}
		);
	};
};

export function saveTasks(tasks) {
	return dispatch => {
		dispatch(saveTasksRequest(tasks));
		return fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({tasks})
		}).then(response => response.json())
		  .then(json => dispatch(saveTasksResponse(json)))
		  .catch(function(err) {
		  	console.log(err);
		  }
		);
	};
};