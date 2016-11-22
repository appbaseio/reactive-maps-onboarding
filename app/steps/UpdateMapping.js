import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';

export class UpdateMapping extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typeName: 'test',
			readOnly: false,
            error: false
        };
        this.errorMsg = '';
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
			this.errorMsg = 'Typename should not be empty.';
            this.setState({
                error: true
            });
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
				<button className="btn btn-primary pos-static" onClick={() => this.submit()}>
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

            {this.state.error ? this.showError(): null}

	      	<div className="row">
	      		<div className="input-field">
	      			<label>
	      				<span>Enter field name to apply mapping</span>
					    <input type="text"
					    	className="form-control"
					    	onChange={this.handleChange}
					    	value={this.state.typeName}
					    	placeholder="App name"
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
