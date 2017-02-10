import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { LoginModal } from '../others/LoginModal';
import { config } from '../config';

export class LoginScreen extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		var loginModal = (<LoginModal></LoginModal>);
		return (
			<div>
				<div className="left">
					<div className="tex-left img-container reactive-logo inlogin">
						<img src="assets/images/logo-blue.png" alt="Reactive Maps" className="img-responsive" />
					</div>
				</div>
				<div className="on-right">
					<div className="steps-wrapper">
						<h2>Get started with an interactive tutorial for Reactive Maps</h2>
						{loginModal}
					</div>
				</div>
			</div>
		);
	}
}

LoginScreen.propTypes = {
};
// Default props value
LoginScreen.defaultProps = {
};
