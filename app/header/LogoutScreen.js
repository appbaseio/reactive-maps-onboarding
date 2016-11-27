import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';

export class LogoutScreen extends Component {
	constructor(props) {
		super(props);
		this.Logout = this.logout.bind(this);
	}
	logout() {
		var baseURL = window.location.href;
		return `https://accapi.appbase.io/logout?next=${baseURL}`;
	}
	render() {
		return (
			<a className="skip-link logout-link" href={this.logout()}>
				Logout
			</a>
		);
	}
}

LogoutScreen.propTypes = {
};
// Default props value
LogoutScreen.defaultProps = {
};
