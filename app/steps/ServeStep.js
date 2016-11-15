import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { AppCreation } from './AppCreation';
import { UpdateMapping } from './UpdateMapping';
import { IndexData } from './IndexData';

export class ServeStep extends Component {
	constructor(props) {
		super(props);
	}
	renderComponent() {
		switch(this.props.step) {
			case 0:
				return (<AppCreation {...this.props}></AppCreation>);
			break;
			case 1:
				return (<UpdateMapping {...this.props}></UpdateMapping>);
			break;
			case 2:
				return (<IndexData {...this.props}></IndexData>);
			break;
		}
	}
	render() {
    	return (
	      	<div>
	      		{this.renderComponent()}
	      	</div>
	    );
    }
}

ServeStep.propTypes = {  
};
// Default props value
ServeStep.defaultProps = {
};