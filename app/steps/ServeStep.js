import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { AppCreation } from './AppCreation';
import { UpdateMapping } from './UpdateMapping';
import { IndexData } from './IndexData';
import {LiveFiddle} from './LiveFiddle';

export class ServeStep extends Component {
    constructor(props) {
        super(props);
    }
    renderComponent() {
        switch(this.props.step) {
            case 0:
                return (<AppCreation {...this.props}></AppCreation>);
            break;
            case 1:
                return (<UpdateMapping {...this.props}></UpdateMapping>);
            break;
            case 2:
                return (<IndexData {...this.props}></IndexData>);
            break;
            case 3:
                return (<LiveFiddle {...this.props}></LiveFiddle>);
            break;
        }
    }
    render() {
        return (
            <div className="steps-wrapper">
                {this.renderComponent()}
            </div>
        );
    }
}

ServeStep.propTypes = {
};
// Default props value
ServeStep.defaultProps = {
};
