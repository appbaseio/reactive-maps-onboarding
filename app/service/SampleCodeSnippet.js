export const sampleCodeSnippet = `const {
	ReactiveBase,
	SingleList,
	MultiList,
	ReactiveMap } = ReactiveMaps;

const Testing = React.createClass({
	onPopoverTrigger: function(marker) {
		return (
			<div>
				{marker._source.place_info}
			</div>
		);
	},
	render: function () {
		return (
			<div className="container-fluid h-100 liveExample">
				<ReactiveBase
					app={{app}}
					username={{username}}
					password={{password}} >
					<div className="row">
						<div className="col s4 col-xs-4 col-sm-4 appbaseListCol">
							<SingleList
								componentId="CitySensor"
								appbaseField="city"
								title="Cities"
								defaultSelected="sanfrancisco"
								showSearch={true}
							/>
						</div>
						<div className="col s8 col-xs-8 col-sm-8 h-100" style={{height: '1000px'}}>
							<ReactiveMap
								appbaseField="location"
								showPopoverOn="click"
								onPopoverTrigger={this.onPopoverTrigger}
								actuate={{
								  CitySensor: {"operation": "must"}
								}}
							/>
						</div>
					</div>
				</ReactiveBase>
			</div>
		)
	}
})

ReactDOM.render(
	<Testing></Testing>,
	document.getElementById('root')
);`;
