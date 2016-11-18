import { default as React, Component } from 'react';
import ReactDOM from 'react-dom';
import { dataOperation } from './service/DataOperation';
import { LoginScreen } from './header/LoginScreen';
import { Steps } from './steps/index';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            loadingProgress: true 
        };
    }
    componentWillMount() {
        this.getUser();
    }
    getUser() {
        this.setState({
            loadingProgress: true
        });
        dataOperation.getUser().done((res) => {
            this.setState({
                loadingProgress: false,
                profile: res
            });
            dataOperation.updateUser(res.body);
        }).fail((res) => {
            this.setState({
                loadingProgress: false
            });
        });
    }
    container() {
        let view = (<LoginScreen></LoginScreen>);
        if(this.state.profile) {
            view = (<Steps></Steps>);
        }
        return view;
    }
    render() {
        return (
            <div className="appContainer">
                <section className={(!this.state.loadingProgress ? "hide" : "loading")}>
                    <div className="is-loadingApp">
                        <div className="loadingBar"></div>
                    </div>
                </section>
                <div className="app-container">
                    {this.container()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('onboarding-container'));