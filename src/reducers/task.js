import {
	EDIT_TASK,
	DELETE_TASK
} from '../actions/index';

export default function task(state, action) {
	switch (action.type) {
		case EDIT_TASK:
			return console.log(action.type);
		case DELETE_TASK:
			return console.log(action.type);
		default:
			return {};
	};
}