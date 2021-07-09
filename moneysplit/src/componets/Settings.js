import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from "../actions/auth";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false,
      name: "",
      password: "",
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({
      name: user.name,
      password: user.password,
    });
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

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, password } = this.state;
    const { dispatch, auth } = this.props;

    dispatch(updateUser(name, password, auth.user._id));
  };
  render() {
    const { user } = this.props.auth;
    const { flag, name, password } = this.state;
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
          {flag && (
            <input
              type="password"
              value={password}
              onChange={this.handlePassword}
            ></input>
          )}
          <div>Name</div>
          {!flag && <div className="values">{user.name}</div>}
          {flag && <input onChange={this.handleName} value={name}></input>}
          <div className="action">
            {!flag && <button onClick={this.handleEdit}>Edit</button>}
            {flag && <button onClick={this.handleSubmit}>Change</button>}
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
