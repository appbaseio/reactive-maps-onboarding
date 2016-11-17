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
      <section className="single-step">
      	<h3 className="step-title">Live Fiddle</h3>
      	<p className="step-description">
      		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum, excepturi dicta quo veritatis itaque. 
      		Aliquid a commodi natus, dicta dolorem quidem temporibus ut. Hic a fuga debitis odio. Quos.
      	</p>
      	<div className="row">
      		<JsonView content={dataOperation.appSnippet()} />
      	</div>
      	<p>Copy above code snippet in fiddle js panel</p>
      	<div className="row">
      		<iframe width="100%" height="300" src="//jsfiddle.net/farhan687/t7dku4tu/5/embedded/result,js" allowFullScreen="allowfullscreen" frameBorder="1"></iframe>
      	</div>
      </section>
    );
  }
}

LiveFiddle.propTypes = {  
};
// Default props value
LiveFiddle.defaultProps = {
};