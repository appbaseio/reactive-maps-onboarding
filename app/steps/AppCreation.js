import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';

export class AppCreation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appName: '',
			readOnly: false,
			url: null
		};
		this.appNameChange = this.appNameChange.bind(this);
		this.createUrl = this.createUrl.bind(this);
	}
	componentDidMount() {
		if(dataOperation.app && dataOperation.app.appName) {
			this.setState({
				appName: dataOperation.app.appName,
				readOnly: true
			});
			dataOperation.createUrl(this.createUrl);
			this.props.nextStep();
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
				alert(this.state.appName+' is already exists!');
			}
		} else {
			alert('App name should not be empty.');
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
				alert('Please try again');
			}
		}).fail((res) => {
			
		});
	}
	createUrl(url) {
		this.setState({
			url: url
		});
	}
	submitBtn() {
		let btn;
		if(!this.state.readOnly) {
			btn = (
				<button className="btn btn-primary" onClick={() => this.submit()}>
      				Submit
      			</button>
			);
		}
		return btn;
	}
	relatedLinks() {
		let links;
		if(this.state.url) {
			links = (
				<div className="row">
					<a href={"https://appbaseio.github.io/gem/#?input_state="+this.state.url} target="_blank" className="col-xs-12">Gem</a>
					<a href={"https://appbaseio.github.io/dejavu/live/#?input_state="+this.state.url} target="_blank" className="col-xs-12">Dejavu</a>
					<a href={"https://appbaseio.github.io/mirage/#?input_state="+this.state.url} target="_blank" className="col-xs-12">Mirage</a>
				</div>
			);
		}
		return links;
	}
	render() {
		let readOnly = {
			readOnly: this.state.readOnly
		};
	    return (
	      <section className="single-step">
	      	<h3 className="step-title">App Creation</h3>
	      	<p className="step-description">
	      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque. 
	      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut. Hic a fuga debitis odio. Quos.
	      	</p>
	      	<div className="row">
	      		<div className="col-xs-8">
	      			<div className="form-group">
					    <input type="text" 
					    	className="form-control" 
					    	onChange={this.appNameChange} 
					    	value={this.state.appName}  
					    	placeholder="App name"
					    	{...readOnly} />
					</div>
	      		</div>
	      		<div className="col-xs-4">
	      			{this.submitBtn()}
	      		</div>
	      		{this.relatedLinks()}
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