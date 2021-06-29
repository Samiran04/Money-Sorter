import React, { Component } from "react";
import { Trip } from "./index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    const { isLoggedIn } = this.props.auth;

    const { from } = this.props.location.state || {
      from: { pathname: "/sign-in" },
    };

    if (!isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <Trip />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
