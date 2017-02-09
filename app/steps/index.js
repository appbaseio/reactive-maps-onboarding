import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { ServeStep } from './ServeStep';
import { dataOperation } from '../service/DataOperation';
import { LogoutScreen } from '../header/LogoutScreen';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Clipboard from 'Clipboard';

export class Steps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 0,
			completedStep: -1
		};
		this.nextStep = this.nextStep.bind(this);
	}
	setStep(step) {
		if (this.state.completedStep + 1 >= step) {
			this.setState({
				currentStep: step
			});
		}
	}
	nextStep() {
		this.setState({
			currentStep: this.state.currentStep + 1,
			completedStep: this.state.completedStep + 1
		});
	}
	skipTutorial() {
		this.setState({
			currentStep: 3
		});
	}
	stepRender() {
		if (this.state.currentStep == 3) {
			let snippet = dataOperation.appSnippet();
			new Clipboard('.copy-btn', {
				text: function(trigger) {
					return snippet;
				}
			});
		}
		return (
			<ServeStep
				key={this.state.currentStep}
				step={this.state.currentStep}
				nextStep={this.nextStep}
				setStep={this.setStep.bind(this)}
				completedStep={this.state.completedStep}>
			</ServeStep>
		);
	}
	renderComponent(method) {
		let element;
		switch (method) {
			case 'logout':
				if (this.state.currentStep === 0) {
					element = (<LogoutScreen />);
				}
				break;
		}
		return element;
	}
	render() {
		return (
			<div>
				<div className="onboarding-left">
					<div className="tex-left img-container reactive-logo">
						<img src="dist/images/logo.svg" alt="Reactive Maps" width="120" />
					</div>
					<ul className="step-widget">
						<h3>
							Getting Started
							<span className="pull-right">{this.state.currentStep + 1} of 4</span>
						</h3>
						<li onClick={this.setStep.bind(this, 0)} className={(this.state.currentStep == 0 ? 'active' : this.state.completedStep >= 0 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">1</span>
							</span>
							Create an app
						</li>
						<li onClick={this.setStep.bind(this, 1)} className={(this.state.currentStep == 1 ? 'active' : this.state.completedStep >= 1 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">2</span>
							</span>
							Define data model
						</li>
						<li onClick={this.setStep.bind(this, 2)} className={(this.state.currentStep == 2 ? 'active' : this.state.completedStep >= 2 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">3</span>
							</span>
							Index data
						</li>
						<li onClick={this.setStep.bind(this, 3)} className={(this.state.currentStep == 3 ? 'active' : this.state.completedStep >= 3 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">4</span>
							</span>
							See the Maps UI
						</li>
					</ul>
					<a href="#" onClick={() => this.skipTutorial()} className="skip-link">Skip Tutorial<i className="fa fa-arrow-right"></i></a>
				</div>
				<div className="onboarding-navbar">
					<h1>Reactive Maps</h1>
					<a href="#" className="pull-right">Skip</a>
				</div>
				<div className="onboarding-progress">
					<div className="status" style={{width: ((this.state.currentStep+1) * 25) + '%'}}></div>
				</div>
				<div className="onboarding-right">
					{this.renderComponent('logout')}
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

Steps.propTypes = {};
// Default props value
Steps.defaultProps = {};
