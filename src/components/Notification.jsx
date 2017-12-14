import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ text, removeNotification }) => (
	<div className="notification">
		{ text }
		<span className="fa fa-times" onClick={removeNotification}></span> 
	</div>
);

Notification.propTypes = {
	text: PropTypes.string.isRequired,
	removeNotification: PropTypes.func.isRequired
};

export default Notification;