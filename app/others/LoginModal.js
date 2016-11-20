import { default as React, Component } from 'react';
import { storageService } from '../service/StorageService';
import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  close() {
    this.internalClose = true;
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  showIcon() {
    let icon = 'Login to continue';
    if(this.state.profile) {
      icon = 'Logout';
    }
    return icon;
  }
  loginLink(method) {
    var baseURL = window.location.href;
    console.log(baseURL, window.location);
    return `https://accapi.appbase.io/login/${method}?next=${baseURL}`;
  }
  render() {
    return (
      <div>
        <a title="Subscribe to updates" className="subscribe" href="javascript:void;" onClick={() => this.open()}>
          {this.showIcon()}
        </a>
        <Modal className="modal-info" show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Appbase Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-xs-12">
                <a href={this.loginLink('google')} className="btn btn-primary">
                  Google Login
                </a>
                <a href={this.loginLink('github')} className="btn btn-primary">
                  Github Login
                </a>
              </div>
            </div>
					</Modal.Body>
        </Modal>
      </div>
    )
  }
}
