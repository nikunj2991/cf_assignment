import { combineReducers } from 'redux';
import task from './task';
import taskList from './taskList';

const rootReducer = combineReducers({
	task,
	taskList
});

export default rootReducer;