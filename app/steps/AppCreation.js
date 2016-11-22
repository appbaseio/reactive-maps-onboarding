import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';

export class AppCreation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appName: '',
			readOnly: false,
			url: null,
            error: false
		};
        this.errorMsg = '';
		this.appNameChange = this.appNameChange.bind(this);
        this.createUrl = this.createUrl.bind(this);
		this.showError = this.showError.bind(this);
	}
	componentDidMount() {
		if(dataOperation.app && dataOperation.app.appName) {
			this.setState({
				appName: dataOperation.app.appName,
				readOnly: true
			});
			dataOperation.createUrl(this.createUrl);
		}
	}
	appNameChange(event) {
		this.setState({
			appName: event.target.value
		});
	}
	submit() {
		if(this.state.appName.trim() != '') {
			if(dataOperation.user && dataOperation.user.apps && !dataOperation.user.apps.hasOwnProperty(this.state.appName)) {
				this.createApp();
			} else {
				this.errorMsg = this.state.appName + ' already exists!';
                this.setState({
                    error: true
                });
			}
		} else {
            this.errorMsg = 'App name should not be empty.';
            this.setState({
                error: true
            });
		}
	}
	createApp() {
		dataOperation.createApp(this.state.appName).done((res) => {
			if (res.message === 'App Created') {
				this.setState({
					readOnly: true
				});
				res.body.appName = this.state.appName;
				dataOperation.updateApp(res.body);
				dataOperation.createUrl(this.createUrl);
				this.props.nextStep();
			} else {
				this.errorMsg = 'Some error occured. Please try again!';
                this.setState({
                    error: true
                });
			}
		}).fail((res) => {

		});
	}
	createUrl(url) {
		this.setState({
			url: url
		});
	}
    showError() {
        return (
            <div className="error-box">
                {this.errorMsg}
            </div>
        )
    }
	submitBtn() {
		let btn;
		if(this.state.readOnly) {
            btn = (
                <button className="btn btn-primary submit-btn" onClick={() => this.props.setStep(1)}>
                    Next
                </button>
            );
        } else {
			btn = (
				<button className="btn btn-primary submit-btn" onClick={() => this.submit()}>
      				Submit
      			</button>
			);
        }
		return btn;
	}
	render() {
		let readOnly = {
			readOnly: this.state.readOnly
		};
	    return (
	      <section className="single-step">
	      	<h2>First things first, create an app</h2>
	      	<p>
	      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque.
	      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut.
	      	</p>

            {this.state.error ? this.showError(): null}

	      	<div className="row">
	      		<div className="input-field">
	      			<label {...readOnly}>
			      		<div className="pulse-holder">
						    <div className="pulse-marker">
						        <div className="pulse-rays"></div>
						    </div>
						</div>
	      				<span>Enter app name</span>
					    <input type="text"
					    	className="form-control"
					    	onChange={this.appNameChange}
					    	value={this.state.appName} />
	      			</label>
	      			{this.submitBtn()}
	      		</div>
	      	</div>
	      </section>
	    );
  	}
}

AppCreation.propTypes = {
};
// Default props value
AppCreation.defaultProps = {
};
