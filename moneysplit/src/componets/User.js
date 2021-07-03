import React, { Component } from "react";
import { connect } from "react-redux";
import { changeMoney } from "../actions/trip";

class User extends Component {
  constructor() {
    super();

    this.state = {
      money: 0,
      edit: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      money: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const { user } = this.props;

    e.preventDefault();

    this.props.dispatch(
      changeMoney(this.props.trip.data._id, user.name, this.state.money)
    );
  };

  handleEdit = (e) => {
    e.preventDefault();
    console.log("HERE");
    this.setState({
      edit: true,
    });
  };
  render() {
    const { user } = this.props;
    const { edit } = this.state;
    return (
      <div className="to-do-item">
        <span className="name">{user.name}</span>
        <span className="name">
          {!edit && user.money}
          {edit && (
            <input
              type="number"
              value={`${user.money}`}
              onChange={this.handleChange}
            ></input>
          )}
        </span>
        <span className="actions">
          <button onClick={this.handleEdit}>Edit</button>
          <button onClick={this.handleSubmit}>Change</button>
        </span>
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
