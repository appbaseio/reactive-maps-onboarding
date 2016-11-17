export const sampleCodeSnippet = `const {ReactiveMap, AppbaseMap, AppbaseSearch, AppbaseSlider, AppbaseList } = ReactiveMapsUmd;
const Testing = React.createClass({
    getDefaultProps: function() {
        return {
            mapStyle: "MapBox",
            mapping: {
                city: 'city.raw',
                location: 'location'
            },
            config: {
                "appbase": {{appbaseConfig}}
            }
        };
    },
  cityQuery: function(value) {
        if(value) {
            let field = 'city';
            let match = {
                [field]:JSON.stringify(value)
            };
            return { match: match };
        } else return null;
    },
    render: function () {
        return (
          <div className="row m-0 h-100">
                <ReactiveMap config={this.props.config} />
                <div className="col s4">
                    <div className="row h-100">
                        <div className="col s12">
                            <AppbaseList
                                sensorId="CitySensor"
                                inputData={this.props.mapping.city}
                                defaultSelected="San Francisco"
                                showCount={true}
                                size={100}
                                multipleSelect={false}
                                includeGeo={false}
                                staticSearch={true}
                                title="Cities"
                                searchPlaceholder="Search City"
                            />
                        </div>
                    </div>
                </div>
                <div className="col s8 h-100" style={{height: '1000px'}}>
                    <AppbaseMap
                        inputData={this.props.mapping.location}
                        defaultZoom={13}
                        defaultCenter={{ lat: 37.74, lng: -122.45 }}
                        historicalData={true}
                        markerCluster={false}
                        searchComponent="appbase"
                        searchField={this.props.mapping.venue}
                        mapStyle={this.props.mapStyle}
                        autoCenter={true}
                        searchAsMoveComponent={true}
                        MapStylesComponent={true}
                        title="Meetupblast"
                        depends={{
                            CitySensor: {"operation": "must", defaultQuery: this.cityQuery}
                        }}
                        />
                </div>
            </div>
        )
    }
})

ReactDOM.render(
  <Testing></Testing>,
  document.getElementById('root')
);`;