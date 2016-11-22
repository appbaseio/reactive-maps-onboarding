import {
	default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';

export class LiveFiddle extends Component {
	constructor(props) {
		super(props);
		this.codepenConfig = this.codepenConfig.bind(this);
	}
	codepenConfig() {
		let config = {
			title: "Reactive maps Example",
			description: "Reactive maps Example",
			html: '<div id="root"></app>',
			html_pre_processor: "none",
			css: '',
			css_pre_processor: "none",
			css_starter: "neither",
			css_prefix_free: false,
			js: dataOperation.appSnippet(),
			js_pre_processor: "babel",
			js_modernizr: false,
			js_library: "",
			html_classes: "",
			css_external: "https://cdn.rawgit.com/appbaseio/reactive-maps/umd/dist/css/vendor.min.css;https://cdn.rawgit.com/appbaseio/reactive-maps/umd/dist/css/style.min.css",
			js_external: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js;https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js;https://maps.google.com/maps/api/js?key=AIzaSyC-v0oz7Pay_ltypZbKasABXGiY9NlpCIY&libraries=places;https://rawgit.com/appbaseio/reactive-maps/umd/umd/ReactiveMaps.js;https://cdn.rawgit.com/appbaseio/reactive-maps/umd/dist/js/vendor.min.js"
		};
		return JSON.stringify(config);
	}
	render() {
		return (
			<section className="single-step" id="codepen-step">
		      	<h2>Check working example on codepen</h2>
		      	<p>
		      		Check live example on codepen with your own dataset.
		      	</p>
		      	<div className="row">
		      		<div className="input-field">
		      			<form action="http://codepen.io/pen/define" method="POST" target="_blank">
						  <input type="hidden" name="data" value={this.codepenConfig()} />
						  <button type="submit" className="btn btn-primary submit-btn">Check on codepen</button>
						</form>	
		      		</div>
		      	</div>
		    </section>
		);
	}
}

LiveFiddle.propTypes = {};
// Default props value
LiveFiddle.defaultProps = {};
