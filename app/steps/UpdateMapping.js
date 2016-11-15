import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';

export class UpdateMapping extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typeName: 'test',
			readOnly: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.mappingObj = {
		    "properties": {
		        "location": {
		            "type": "geo_point"
		        },
		        "city": {
		            "type": "string",
		            "fields": {
		                "raw": {
		                    "type": "string",
		                    "index": "not_analyzed"
		                }
		            }
		        }
		    }
		};
	}
	handleChange(event) {
		this.setState({
			typeName: event.target.value
		});
	}
	submit() {
		if(this.state.typeName.trim() != '') {
			this.updateMapping();
		} else {
			alert('Typename should not be empty.');
		}
	}
	updateMapping() {
		dataOperation.updateMapping(this.state.typeName, this.mappingObj).done((res) => {
			this.setState({
				readOnly: true
			});
			this.props.nextStep();
		}).fail((res) => {
			
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
	render() {
		let readOnly = {
			readOnly: this.state.readOnly
		};
	    return (
	      <section className="single-step">
	      	<h3 className="step-title">Update Mapping</h3>
	      	<p className="step-description">
	      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque. 
	      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut. Hic a fuga debitis odio. Quos.
	      	</p>
	      	<div className="row">
	      		<div className="col-xs-8">
	      			<div className="form-group">
					    <input type="text" 
					    	className="form-control" 
					    	onChange={this.handleChange} 
					    	value={this.state.typeName}  
					    	placeholder="App name"
					    	{...readOnly} />
					</div>
	      		</div>
	      		<div className="col-xs-4">
	      			{this.submitBtn()}
	      		</div>
	      		<div className="col-xs-12">
	      			<JsonView content={JSON.stringify(this.mappingObj, null, 4)} />
	      		</div>
	      	</div>
	      </section>
	    );
  	}
}

UpdateMapping.propTypes = {  
};
// Default props value
UpdateMapping.defaultProps = {
};