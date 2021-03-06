import {
	default as React, Component } from 'react';
import { render } from 'react-dom';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import Highlight from 'react-highlight';
import { dataOperation } from '../service/DataOperation';
import { JsonView } from '../others/JsonView';
import { indexData } from '../service/indexData';

export class IndexData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typeName: 'test'
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			typeName: event.target.value
		});
	}
	submit() {
		let finalData = indexData.map((record, i) => {
			record.place_info = this.refs['info' + i].value;
			return record;
		});
		this.IndexData(finalData);
	}
	IndexData(finalData) {
		dataOperation.indexData(finalData).on('data', function(res) {
			this.props.nextStep();
		}.bind(this)).on('error', function(err) {
			alert('Try different name please!');
		});
	}
	setJsonPopover(fieldRecord) {
		let fieldRecordStringify = JSON.stringify(fieldRecord, null, 2);
		const jsonPopover = (
			<Popover id="jsonPopover" className='jsonPopover'>
			<Highlight className="json">{fieldRecordStringify}</Highlight>
		  </Popover>
		);
		const jsonOverlay = (
			<OverlayTrigger trigger={['click']} rootClose placement="right" overlay={jsonPopover}>
			<button className="jsonPopoverBtn"></button>
		  </OverlayTrigger>
		);
		return jsonOverlay;
	}
	records() {
		return indexData.map((record, i) => {
			return (
				<tr key={i}>
					<td>
						{this.setJsonPopover(record)}
					</td>
					<td>
						<div className="form-group place-info-inputbox">
							<i className="fa fa-pencil input-prefix"></i>
							<input type="text" className="form-control" ref={'info'+i} defaultValue={"loc"+(i+1)} placeholder="Type place info" />
						</div>
					</td>
					<td>
						{JSON.stringify(record.location, null, 2)}
					</td>
					<td>
						{record.city}
					</td>
				</tr>
			);
		});
	}
	submitBtn() {
		let btn;
		if (this.props.completedStep >= 2) {
			btn = (
				<button className="btn btn-primary pos-static submit-btn" onClick={() => this.props.setStep(3)}>
					Next
				</button>
			);
		} else {
			btn = (
				<button className="btn btn-primary pos-static submit-btn" onClick={() => this.submit()}>
					Submit
				</button>
			);
		}
		return btn;
	}
	render() {
		return (
			<section className="single-step" id="index-data">
			<h2>Index Data</h2>
			<p>
			  In this step, we will index 10 sample JSON objects so that we have something to see in the final maps view.
			</p>
			<p>
				In the table below, you can change the <strong>Place Info</strong> field. Once you have the descriptions to your liking, press <strong>Submit</strong> to go the final step.
			</p>
			<div className="row">
				<div className="input-field">
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>
									JSON
								</th>
								<th>
									Place Info
								</th>
								<th>
									Location
								</th>
								<th>
									City
								</th>
							</tr>
						</thead>
						<tbody>
							{this.records()}
						</tbody>
					</table>

					{this.submitBtn()}
				</div>
			</div>
		  </section>
		);
	}
}

IndexData.propTypes = {};
// Default props value
IndexData.defaultProps = {};
