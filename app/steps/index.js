import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { ServeStep } from './ServeStep';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
		return (
			<ServeStep
				key={this.state.currentStep}
				step={this.state.currentStep}
				nextStep={this.nextStep}>
			</ServeStep>
		);
	}
	render() {
		return (
			<div>
				<div className="left">
					<img src="dist/images/logo.svg" alt="Reactive Maps" width="120" />
					<ul className="step-widget">
						<h3>
							Getting Started
							<span className="pull-right">{this.state.currentStep + 1} of 4</span>
						</h3>
						<li className={(this.state.currentStep == 0 ? 'active' : this.state.currentStep > 0 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<i className="fa fa-circle"></i>
							</span>
							Create your app
						</li>
						<li className={(this.state.currentStep == 1 ? 'active' : this.state.currentStep > 1 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<i className="fa fa-circle"></i>
							</span>
							Update Mappings
						</li>
						<li className={(this.state.currentStep == 2 ? 'active' : this.state.currentStep > 2 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<i className="fa fa-circle"></i>
							</span>
							Index your data
						</li>
						<li className={(this.state.currentStep == 3 ? 'active' : this.state.currentStep > 3 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<i className="fa fa-circle"></i>
							</span>
							Final interactive app
						</li>
					</ul>
				</div>
				<div className="right">
					<ReactCSSTransitionGroup
						transitionName="fadeSlideIn"
						transitionAppear={true}
						transitionAppearTimeout={500}
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{this.stepRender()}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		);
	}
}

Steps.propTypes = {  
};
// Default props value
Steps.defaultProps = {
};