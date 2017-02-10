export const sampleCodeSnippet = `const {
	ReactiveBase,
	SingleList,
	MultiList,
	ReactiveMap } = ReactiveMaps;

const Testing = React.createClass({
    getDefaultProps: function() {
        return {
        	mapStyle: "Standard",
			mapping: {
				city: 'city',
				location: 'location'
			},
			config: {
				"appbase": {
					app: {{app}},
					username: {{username}},
					password: {{password}},
					type: {{type}}
				}
			}
        };
    },
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
					app={this.props.config.appbase.app}
					username={this.props.config.appbase.username}
					password={this.props.config.appbase.password}
					>
					<div className="row">
						<div className="col s4 col-xs-4 col-sm-4 appbaseListCol">
							<SingleList
								componentId="CitySensor"
								appbaseField={this.props.mapping.city}
								defaultSelected="london"
								showCount={true}
								size={100}
								showSearch={true}
								title="Cities"
								searchPlaceholder="Search City"
							/>
						</div>
						<div className="col s8 col-xs-8 col-sm-8 h-100" style={{height: '1000px'}}>
							<ReactiveMap
							appbaseField={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							setMarkerCluster={false}
							defaultMapStyle={this.props.mapStyle}
							autoCenter={true}
							size={100}
							showSearchAsMove={true}
							showMapStyles={true}
							title="Meetupblast"
							showPopoverOn="click"
							onPopoverTrigger = {this.onPopoverTrigger}
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
