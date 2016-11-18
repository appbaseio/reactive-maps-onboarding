import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { LoginModal } from '../others/LoginModal';
import { config } from '../config';

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var loginModal = (<LoginModal></LoginModal>);
        return (
            <div className="right">
                <div className="steps-wrapper">
                    <h2>Get started with Reactive Maps</h2>
                    {loginModal}
                </div>
            </div> 
        );
    }
}

LoginScreen.propTypes = {  
};
// Default props value
LoginScreen.defaultProps = {
};