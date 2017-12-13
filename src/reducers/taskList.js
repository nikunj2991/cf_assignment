import {
	LOAD_TASK_REQUEST,
	LOAD_TASK_RESPONSE,
	SAVE_TASKS_REQUEST,
	SAVE_TASKS_RESPONSE,
	ADD_TASK
} from '../actions/index';

const initialState = {
	tasks: [],
	notification: '',
	isSaveBtnEnabled: false,
	isLoadingTasks: false,
	idCounter: 0
};

export default function taskList(state, action) {
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
			const incrementedIdCounter = state.idCounter + 1;
			const newTask = {
				isFocused: true,
				name: '',
				id: incrementedIdCounter
			};
			const { tasks } = state;
			tasks.unshift(newTask);
			return Object.assign({}, state, { tasks, idCounter: incrementedIdCounter });
		default:
			return initialState;
	};
};