import React, { Component } from "react";
import { connect } from "react-redux";
import { changeMoney, deleteUser } from "../actions/trip";

class User extends Component {
  constructor() {
    super();

    this.state = {
      money: 0,
      edit: false,
      flag: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      money: user.money,
    });
  }

  handleChange = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        money: e.target.value,
        flag: false,
      });
    } else {
      this.setState({
        flag: true,
      });
    }
  };

  handleSubmit = (e) => {
    const { user } = this.props;

    e.preventDefault();

    this.props.dispatch(
      changeMoney(this.props.trip.data._id, user.name, this.state.money)
    );

    this.setState({
      edit: false,
    });
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      edit: true,
    });
  };

  handleCancle = (e) => {
    e.preventDefault();
    this.setState({
      edit: false,
      flag: false,
    });
  };

  handleDelete = (e) => {
    const { user } = this.props;

    e.preventDefault();

    this.props.dispatch(deleteUser(this.props.trip.data._id, user.name));
  };

  render() {
    const { user } = this.props;
    const { edit, money, flag } = this.state;
    return (
      <div>
        <div className="to-do-item">
          <span className="name">{user.name}</span>
          <span className="name">
            {!edit && user.money}
            {edit && (
              <input
                type="number"
                value={`${money}`}
                onChange={this.handleChange}
              ></input>
            )}
          </span>
          <span className="actions">
            {!edit && <button onClick={this.handleEdit}>Edit</button>}
            {!edit && <button onClick={this.handleDelete}>Delete</button>}
            {edit && <button onClick={this.handleCancle}>Cancel</button>}
            {edit && <button onClick={this.handleSubmit}>Change</button>}
          </span>
        </div>

        <div>
          {flag && (
            <p className="negative-warning">
              Only zero to positive numbers are allowed
            </p>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trip: state.trip,
  };
}

export default connect(mapStateToProps)(User);
