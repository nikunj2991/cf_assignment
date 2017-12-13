const name = 'nmehta';

export const LOAD_TASK_REQUEST = 'LOAD_TASK_REQUEST';
export const LOAD_TASK_RESPONSE = 'LOAD_TASK_RESPONSE';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const SAVE_TASKS_REQUEST = 'SAVE_TASKS_REQUEST';
export const SAVE_TASKS_RESPONSE = 'SAVE_TASKS_RESPONSE';

export const loadTaskRequest = () => {
  return {
    type: LOAD_TASK_REQUEST
  };
};

export const loadTaskResponse = (response) => {
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

export const saveTaskRequest = (tasks) => {
	return {
		type: SAVE_TASKS_REQUEST,
		tasks
	};
};

export const saveTaskResponse = (response) => {
	return {
		type: SAVE_TASKS_RESPONSE,
		response
	};
};

export function loadTasks() {
	return dispatch => {
		dispatch(loadTaskRequest());
		return fetch(`http://cfassignment.herokuapp.com/${name}/tasks`)
			.then(response => response.json())
			.then(json => dispatch(loadTaskResponse(json)))
			.catch(function(err) {
				console.log(err);
			});
	};
};