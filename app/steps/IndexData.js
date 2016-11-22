import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';
import { indexData } from '../service/indexData';

export class IndexData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typeName: 'test',
            error: false
		};
        this.errorMsg = '';
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
            this.errorMsg = 'Typename should not be empty.';
            this.setState({
                error: true
            });
		}
	}
	IndexData() {
		dataOperation.indexData(indexData).on('data', function(res) {
			this.props.nextStep();
		}.bind(this)).on('error', function(err) {
            this.errorMsg = 'Try different name please!';
            this.setState({
                error: true
            });
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
        if(this.props.completedStep >= 2) {
            btn = (
                <button className="btn btn-primary pos-static" onClick={() => this.props.setStep(3)}>
                    Next
                </button>
            );
        } else {
            btn = (
                <button className="btn btn-primary pos-static" onClick={() => this.submit()}>
                    Submit
                </button>
            );
        }
        return btn;
    }
	render() {
    return (
      <section className="single-step">
      	<h2>Index Data</h2>
      	<p>
      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque.
      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut. Hic a fuga debitis odio. Quos.
      	</p>

        {this.state.error ? this.showError(): null}

      	<div className="row">
      		<div className="input-field">
      			<JsonView content={JSON.stringify(indexData, null, 4)} />
      			{this.submitBtn()}
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
