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
      selectedFile: null,
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

  handleFile = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, password, selectedFile } = this.state;
    const { dispatch, auth } = this.props;

    dispatch(updateUser(name, password, auth.user._id, selectedFile));
  };
  render() {
    const { user } = this.props.auth;
    const { flag, name, password } = this.state;
    return (
      <div className="settings">
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
            {!flag && (
              <button className="edit" onClick={this.handleEdit}>
                Edit
              </button>
            )}
            {flag && (
              <button className="change" onClick={this.handleSubmit}>
                Change
              </button>
            )}
            {flag && (
              <button className="cancel" onClick={this.handleCancle}>
                Cancel
              </button>
            )}
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
