import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser, removeErrorMessage } from "../actions/auth";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(removeErrorMessage());
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    const { password, confirm_password, name, email } = this.state;

    dispatch(createUser(name, email, password, confirm_password));
  };
  render() {
    const { inProgress, isLoggedIn, error } = this.props.auth;

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <form className="login-form">
          <span className="login-signup-header">Sign Up</span>
          {error && <div className="alert error-dailog">{error}</div>}
          <div className="field">
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              required
              onChange={this.handleChange}
            />
          </div>
          {inProgress ? (
            <div className="field">
              <button onClick={this.handleFormSubmit} disabled>
                Loading...
              </button>
            </div>
          ) : (
            <div className="field">
              <button onClick={this.handleFormSubmit}>Sign Up</button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SignUp);
