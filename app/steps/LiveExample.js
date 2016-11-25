import {
	default as React,
	Component
} from 'react';
import { render } from 'react-dom';
import { dataOperation } from '../service/DataOperation';
import {
	ReactiveMap,
	AppbaseMap,
	AppbaseSearch,
	AppbaseSlider,
	AppbaseList
} from 'reactive-maps';

export class LiveExample extends Component {
	constructor(props) {
		super(props);
		this.popoverContent = this.popoverContent.bind(this);

	}
	popoverContent(marker) {
		return (
			<div className="popoverComponent row">
           {marker._source.place_info}
        </div>
		);
	}
	render() {
		return (
			<div className="row m-0 h-100 liveExample">
                <ReactiveMap config={this.props.config} />
                <div className="col s12 m4 appbaseListCol">
                    <AppbaseList
                        sensorId="CitySensor"
                        inputData={this.props.mapping.city}
                        defaultSelected="sanfrancisco"
                        showCount={true}
                        size={100}
                        multipleSelect={false}
                        includeGeo={false}
                        staticSearch={true}
                        title="Cities"
                        searchPlaceholder="Search City"
                    />
                </div>
                <div className="col s12 m8 h-100" style={{height: '1000px'}}>
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
                        showPopoverOn = "onClick"
                        popoverContent = {this.popoverContent}
                        depends={{
                            CitySensor: {"operation": "must"}
                        }}
                        />
                </div>
            </div>
		);
	}
}

LiveExample.propTypes = {};
// Default props value
LiveExample.defaultProps = {
	mapStyle: "MapBox",
	mapping: {
		city: 'city',
		location: 'location'
	},
	config: {
		"appbase": {
			"appname": "ReactTestApp3",
			"username": "CR1KCtfUY",
			"password": "a5aaebbe-c734-43e5-89dc-76d0f37689eb",
			"type": "test"
		}
	}
};
