import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';
import { indexData } from '../service/indexData';

export class IndexData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typeName: 'test'
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			typeName: event.target.value
		});
	}
	submit() {
		if(this.state.typeName.trim() != '') {
			this.IndexData();
		} else {
			alert('Typename should not be empty.');
		}
	}
	IndexData() {
		dataOperation.indexData(indexData).on('data', function(res) {
			this.props.nextStep();
		}.bind(this)).on('error', function(err) {
			alert('Try different name please!');
		});
	}
	render() {
    return (
      <section className="single-step">
      	<h3 className="step-title">Index Data</h3>
      	<p className="step-description">
      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque. 
      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut. Hic a fuga debitis odio. Quos.
      	</p>
      	<div className="row">
      		<div className="col-xs-12">
      			<JsonView content={JSON.stringify(indexData, null, 4)} />
      		</div>
      		<div className="col-xs-12">
      			<button className="btn btn-primary" onClick={() => this.submit()}>
      				Submit
      			</button>
      		</div>
      	</div>
      </section>
    );
  }
}

IndexData.propTypes = {  
};
// Default props value
IndexData.defaultProps = {
};