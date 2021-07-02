import React, { Component } from "react";
import { connect } from "react-redux";
import { changeMoney } from "../actions/trip";

class User extends Component {
  constructor() {
    super();

    this.state = {
      money: 0,
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
  render() {
    const { user } = this.props;
    return (
      <div>
        <span>{user.name}</span>
        <span>{user.money}</span>
        <input type="number" onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit}>Change</button>
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
