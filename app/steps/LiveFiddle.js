import {
	default as React, Component } from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';
import { Tabs, Tab } from 'react-bootstrap';
import {LiveExample} from './LiveExample';

export class LiveFiddle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: 1
		};
		this.codepenConfig = this.codepenConfig.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
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
	handleSelect(key) {
	    this.setState({key}, function() {
	    	setTimeout(() => {
	    		this.setState({showJs: true});
	    	}, 400);
	    });
	}
	renderJs() {
		let jsview;
		if(this.state.showJs) {
			jsview = (<JsonView content = {dataOperation.appSnippet()}></JsonView>);
		}
		return jsview;
	}
	render() {
		return (
			<section className="single-step" id="codepen-step">
		      	<Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
			        <Tab eventKey={1} title="Live">
			        	<LiveExample config={{appbase: dataOperation.appConfig()}} />
			        </Tab>
			        <Tab eventKey={2} title="JS">
			        	{this.renderJs()}
			        </Tab>
			        <Tab eventKey={3} title="Html">
			        	<JsonView content = {dataOperation.htmlSnippet()} />
			        </Tab>
			    </Tabs>
			    <div className="extra-btns">
			    	<form action="http://jsfiddle.net/api/post/library/pure/" method="POST" target="check">
						<input type="hidden" name="html" value={dataOperation.htmlSnippet()} />
						<input type="hidden" name="resources" value={dataOperation.resources()} />
						<input type="hidden" name="js" value={dataOperation.appSnippet()} />
						<input type="hidden" name="panel_js" value={3} />
						<input type="hidden" name="wrap" value='l' />
						<button type="submit" className="btn btn-primary submit-btn">jsfiddle</button>
					</form>	
			    </div>
		    </section>
		);
	}
}

LiveFiddle.propTypes = {};
// Default props value
LiveFiddle.defaultProps = {};
