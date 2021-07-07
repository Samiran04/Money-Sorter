import React, { Component } from "react";
import { connect } from "react-redux";

class Settings extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="settings">
        <div>
          <span>Name: </span>
          <span className="values">{user.name}</span>
        </div>
        <div>
          <span>Password: </span>
          <span className="values">{user.password}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Settings);
