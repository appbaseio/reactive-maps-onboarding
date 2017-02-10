import { default as React, Component } from 'react';
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
			title                 : "Reactivemaps App",
			description           : "Powered by appbase.io",
			private               : false,
			editors               : "101",
			layout                : "left",
			html                  : "<div id='root'></div>",
			js                    : dataOperation.appSnippet(),
			js_pre_processor      : "babel",
			head                  : "<meta name='viewport' content='width=device-width'>",
			css_external          : "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css;https://cdn.rawgit.com/appbaseio/reactivemaps/master/dist/css/style.min.css",
			js_external           : "https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js;https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js;https://maps.google.com/maps/api/js?key=AIzaSyC-v0oz7Pay_ltypZbKasABXGiY9NlpCIY&libraries=places;https://cdn.rawgit.com/appbaseio/reactivemaps/master/umd/ReactiveMaps.js"

		};
		return JSON.stringify(config);
	}
	handleSelect(key) {
		this.setState({key}, function() {
			setTimeout(() => {
				if(this.state.key === 2) {
					this.setState({showJs: true});
				}
				if(this.state.key === 3) {
					this.setState({showHtml: true});
				}
			}, 400);
		});
	}
	renderComponent(method) {
		let element;
		switch(method) {
			case 'js':
				if(this.state.showJs) {
					element = (<JsonView content = {dataOperation.appSnippet()}></JsonView>);
				}
			break;
			case 'html':
				if(this.state.showHtml) {
					element = (<JsonView content = {dataOperation.htmlSnippet('full')} />);
				}
			break;
		}
		return element;
	}
	render() {
		return (
			<section className="single-step" id="codepen-step">
				<Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
					<Tab eventKey={1} title="Live">
						<LiveExample config={{appbase: dataOperation.appConfig()}} />
					</Tab>
					<Tab eventKey={2} title="JS">
						{this.renderComponent('js')}
					</Tab>
					<Tab eventKey={3} title="HTML">
						{this.renderComponent('html')}
					</Tab>
				</Tabs>
				<div className="extra-btns">
					<form action="http://codepen.io/pen/define" method="POST" target="_blank">
						<input type="hidden" name="data" value={this.codepenConfig()} />
						<button type="submit" className="subscribe"><i className="fa fa-external-link"></i> Codepen</button>
					</form>
				</div>
			</section>
		);
	}
}

LiveFiddle.propTypes = {};
// Default props value
LiveFiddle.defaultProps = {};
