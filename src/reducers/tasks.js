import {
	LOAD_TASK_REQUEST,
	LOAD_TASK_RESPONSE,
	SAVE_TASKS_REQUEST,
	SAVE_TASKS_RESPONSE,
	ADD_TASK,
	EDIT_TASK,
	DELETE_TASK
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
	switch (action.type) {
		case LOAD_TASK_REQUEST:
			return Object.assign({}, state, {isLoadingTasks: true});
		case LOAD_TASK_RESPONSE:
			const fetchedTasks = action.repsonse && action.response.tasks ? action.response.tasks : [];
			return Object.assign({}, state, { tasks: fetchedTasks, isLoadingTasks: false });
		case SAVE_TASKS_REQUEST:
			return console.log(action.type);
		case SAVE_TASKS_RESPONSE:
			return console.log(action.type);
		case ADD_TASK:
			const newTasks = {}
			const updatedIdCounter = state.idCounter + 1;
			const newTask = {
				name: '',
				id: updatedIdCounter
			};
			return Object.assign({}, state, {
					tasks: [...state.tasks, newTask],
					idCounter: updatedIdCounter
				}
			);
		case EDIT_TASK:
			updatedTasks = state.tasks.map(function(task, index) {
				if(task.id === action.task.id) {
					task.name = action.task.name;
				}
				return task;
			});
			return Object.assign({}, state, { tasks: updatedTasks });
		case DELETE_TASK:
			updatedTasks = state.tasks.filter(function(task, index) {
				return task.id !== action.taskId
			}); 
			return Object.assign({}, state, { tasks: updatedTasks });
		default:
			return initialState;
	};
};