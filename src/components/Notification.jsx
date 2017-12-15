import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ text, removeNotification, errorNotification }) => {
	const classString = !errorNotification ? 'notification success' : 'notification error';
	return (
		<div className={classString}>
			{ text }
			<span className="fa fa-times" onClick={removeNotification}></span> 
		</div>
	);
};

Notification.propTypes = {
	text: PropTypes.string.isRequired,
	removeNotification: PropTypes.func.isRequired,
	errorNotification: PropTypes.bool
};

export default Notification;