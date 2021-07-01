import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startSignOut } from "../actions/auth";

class Navbar extends Component {
  handleSignOut = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(startSignOut());
  };
  render() {
    const { isLoggedIn, user } = this.props.auth;
    return (
      <div>
        <nav className="nav">
          <div className="left-nav">
            <Link to="/">
              <h1>Money Split</h1>
            </Link>
          </div>
          <div className="right-nav">
            <div className="nav-links">
              <ul>
                <li>
                  {isLoggedIn ? (
                    <Link to="">{user.name}</Link>
                  ) : (
                    <Link to="/sign-in">Log In</Link>
                  )}
                </li>
                <li>
                  {isLoggedIn ? (
                    <div onClick={this.handleSignOut}>Log Out</div>
                  ) : (
                    <Link to="/sign-up">Register</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
