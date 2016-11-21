import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { ServeStep } from './ServeStep';
import { dataOperation } from '../service/DataOperation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Clipboard from 'Clipboard';

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
				nextStep={this.nextStep}>
			</ServeStep>
		);
	}
    copyBtnRender(){
        return (
            <a className="copy-btn subscribe">Copy Generated Code</a>
        )
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
								<span className="circle">1</span>
							</span>
							Create your app
						</li>
						<li className={(this.state.currentStep == 1 ? 'active' : this.state.currentStep > 1 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">2</span>
							</span>
							Update Mappings
						</li>
						<li className={(this.state.currentStep == 2 ? 'active' : this.state.currentStep > 2 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">3</span>
							</span>
							Index your data
						</li>
						<li className={(this.state.currentStep == 3 ? 'active' : this.state.currentStep > 3 ? 'finished' : null)}>
							<span className="icon">
								<i className="fa fa-check-circle"></i>
								<span className="circle">4</span>
							</span>
							Final interactive app
						</li>
					</ul>
                    {this.state.currentStep == 3 ? this.copyBtnRender() : null}
                    <a href="#" className="skip-link">Skip Tutorial<i className="fa fa-arrow-right"></i></a>
				</div>
                <div className="onboarding-navbar">
                    <h1>Reactive Maps</h1>
                    <a href="#" className="pull-right">Skip</a>
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
