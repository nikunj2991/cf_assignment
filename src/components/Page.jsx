import React from 'react';
import Task from './Task';

class Page extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="page">
				<div className="header"></div>
				<div className="content">
					<div className="content-header">
						<h2>Tasks</h2>
						<button type="button" className="add-task">Add Task</button>
						<button type="button" className="save">Save</button>  
					</div>
					<Task />
				</div>
			</div>
		);
	}
}

export default Page;