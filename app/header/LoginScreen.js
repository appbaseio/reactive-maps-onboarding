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
      <div className="text-center">
        <h2>Login Required</h2>
        {loginModal}
      </div> 
    );
  }
}

LoginScreen.propTypes = {  
};
// Default props value
LoginScreen.defaultProps = {
};