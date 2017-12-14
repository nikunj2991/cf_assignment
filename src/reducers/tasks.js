import {
	LOAD_TASK_REQUEST,
	LOAD_TASK_RESPONSE,
	SAVE_TASKS_REQUEST,
	SAVE_TASKS_RESPONSE,
	ADD_TASK,
	EDIT_TASK,
	DELETE_TASK,
	REMOVE_NOTIFICATION
} from '../actions/index';

const initialState = {
	tasks: [],
	notification: '',
	isSaveBtnEnabled: false,
	isLoadingTasks: false,
	idCounter: 0
};

export default function tasks(state, action) {
	let updatedTasks;
	let newNotification = '';
	let updatedIdCounter;
	switch (action.type) {
		case LOAD_TASK_REQUEST:
			return Object.assign({}, state, {isLoadingTasks: true});
		case LOAD_TASK_RESPONSE:
			const fetchedTasks = action.response && action.response.tasks ? action.response.tasks : [];
			updatedIdCounter = state.idCounter;
			if(fetchedTasks.length) {
				updatedIdCounter = Math.max.apply(Math, fetchedTasks.map(function(fetchedTask) {
					return fetchedTask.id;
				}));
			}
			return Object.assign({}, state, { tasks: fetchedTasks, isLoadingTasks: false, idCounter: updatedIdCounter });
		case SAVE_TASKS_REQUEST:
			return Object.assign({}, state, { isSaveBtnEnabled: false });
		case SAVE_TASKS_RESPONSE:
			newNotification = 'Tasks saved successfully.';
			return Object.assign({}, state, { notification: newNotification });
		case ADD_TASK:
			const newTasks = {}
			updatedIdCounter = state.idCounter + 1;
			const newTask = {
				name: '',
				id: updatedIdCounter
			};
			updatedTasks = Object.assign([], state.tasks);
			updatedTasks.unshift(newTask);
			return Object.assign({}, state, {
					tasks: updatedTasks,
					idCounter: updatedIdCounter,
					isSaveBtnEnabled: true
				}
			);
		case EDIT_TASK:
			updatedTasks = state.tasks.map(function(task, index) {
				if(task.id === action.task.id) {
					task.name = action.task.name;
				}
				return task;
			});
			return Object.assign({}, state, { tasks: updatedTasks, isSaveBtnEnabled: true });
		case DELETE_TASK:
			updatedTasks = state.tasks.filter(function(task, index) {
				return task.id !== action.taskId
			}); 
			return Object.assign({}, state, { tasks: updatedTasks, isSaveBtnEnabled: true });
		case REMOVE_NOTIFICATION:
			return Object.assign({}, state, { notification: '' });
		default:
			return initialState;
	};
};