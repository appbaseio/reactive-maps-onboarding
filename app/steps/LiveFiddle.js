import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';

export class LiveFiddle extends Component {
	constructor(props) {
		super(props);
	}
	submit() {
		
	}
	render() {
		return (
			<section className="fiddle-screen">
				<iframe
					width="100%" height="100%"
					src="//jsfiddle.net/farhan687/t7dku4tu/5/embedded/result,js"
					allowFullScreen="allowfullscreen">
				</iframe>
			</section>
		);
	}
}

LiveFiddle.propTypes = {  
};
// Default props value
LiveFiddle.defaultProps = {
};