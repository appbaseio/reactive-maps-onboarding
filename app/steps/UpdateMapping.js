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
		        "place_info": {
		            "type": "string"
		        },
		        "location": {
		            "type": "geo_point"
		        },
		        "city": {
		            "type": "string",
		            "index": "not_analyzed"
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
				<button className="btn btn-primary pos-static submit-btn" onClick={() => this.submit()}>
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
	      	<h2>Update Mapping</h2>
	      	<p>
	      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque. 
	      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut. Hic a fuga debitis odio. Quos.
	      	</p>
	      	<div className="row">
	      		<div className="input-field">
	      			<label>
	      				<span>Enter type name to apply mapping</span>
					    <input type="text" 
					    	className="form-control" 
					    	onChange={this.handleChange} 
					    	value={this.state.typeName}  
					    	placeholder="Type name"
					    	{...readOnly} />
					</label>
		      		<div className="mapping-wrapper">
		      			<JsonView content={JSON.stringify(this.mappingObj, null, 4)} />
		      		</div>
  					{this.submitBtn()}
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