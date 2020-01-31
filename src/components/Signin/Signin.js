import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LoginService from '../../services/login.service';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmit = async () => {
    const { email, password } = this.state;
    const { onSignIn, loadUser, history } = this.props;

    const result = await LoginService.signin(email, password);
    if (result && result.user) {
      onSignIn();
      loadUser(result.user);
      history.push(`/profile/${result.id}`);
    } else {
      await this.setState({
        email: '',
        password: ''
      });

      NotificationManager.error(result.message, 'Oh snap!', 5000);
      history.push('/signin');
    }
  };

  render() {
    return (
      <div className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={() => this.onSubmit()}
              />
            </div>
          </div>
        </main>

        <NotificationContainer />
      </div>
    );
  }
}

export default withRouter(Signin);
