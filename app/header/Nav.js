import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { LoginModal } from '../others/LoginModal';
import { config } from '../config';

export class Nav extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">
							<img alt="Brand" src="assets/images/logo.png" className="img-responsive" />
						</a>
					</div>
					<span className="pull-right">
						<LoginModal></LoginModal>
					</span>
				</div>
			</nav>
		);
	}
}

Nav.propTypes = {
};
// Default props value
Nav.defaultProps = {
};
