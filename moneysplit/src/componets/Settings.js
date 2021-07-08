import React, { Component } from "react";
import { connect } from "react-redux";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
    };
  }

  handleEdit = (e) => {
    e.preventDefault();

    this.setState({
      flag: true,
    });
  };

  handleCancle = (e) => {
    e.preventDefault();

    this.setState({
      flag: false,
    });
  };
  render() {
    const { user } = this.props.auth;
    const { flag } = this.state;
    return (
      <div className="settings">
        <div className="profile">
          <img
            src="https://image.flaticon.com/icons/png/512/236/236832.png"
            alt="Profile-Image"
            className="image"
          ></img>
        </div>
        <div className="settings-inner">
          {!flag && <div>Email</div>}
          {!flag && <div className="values">{user.email}</div>}
          {flag && <div>Password</div>}
          {flag && <input type="password" value={user.password}></input>}
          <div>Name</div>
          {!flag && <div className="values">{user.name}</div>}
          {flag && <input value={user.name}></input>}
          <div className="action">
            {!flag && <button onClick={this.handleEdit}>Edit</button>}
            {flag && <button>Change</button>}
            {flag && <button onClick={this.handleCancle}>Cancle</button>}
          </div>
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
