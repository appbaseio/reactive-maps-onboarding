import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { ServeStep } from './ServeStep';

export class Steps extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	currentStep: 0
	    };
	    this.nextStep = this.nextStep.bind(this);
	}
	nextStep() {
		this.setState({
			currentStep: this.state.currentStep+1
		});
	}
	stepRender() {
		let steps = [];
		for(let i = 0; i <= this.state.currentStep; i++) {
			let single_step = (<ServeStep key={i} step={i} nextStep={this.nextStep}></ServeStep>);
			steps.push(single_step);
		}
		return steps;
	}
	render() {
		return (
			<div>
				{this.stepRender()}
			</div>
		);
	}
}

Steps.propTypes = {  
};
// Default props value
Steps.defaultProps = {
};