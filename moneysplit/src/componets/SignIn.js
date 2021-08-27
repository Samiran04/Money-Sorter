import React, { Component } from "react";
import {
  authenticateUser,
  removeErrorMessage,
  userCreateExtra,
} from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(removeErrorMessage());
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(userCreateExtra());
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(authenticateUser(email, password));
  };
  render() {
    const { inProgress, error, isLoggedIn } = this.props.auth;
    const { email, password } = this.state;

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={this.handleEmail}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={this.handlePassword}
          />
        </div>
        {inProgress ? (
          <div className="field">
            <button disabled>Loading...</button>
          </div>
        ) : (
          <div className="field">
            <button onClick={this.handleSubmit}>Log In</button>
          </div>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
