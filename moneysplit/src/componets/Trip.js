import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrip, enterTripUser } from "../actions/trip";
import { User } from "./index";
import { Link } from "react-router-dom";

class Trip extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;

    const { tripId } = params;

    dispatch(getTrip(tripId));
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;

    this.props.dispatch(enterTripUser(name, this.props.trip.data._id));

    this.setState({
      name: "",
    });
  };
  render() {
    const { data, inProgress } = this.props.trip;
    return (
      <div className="list-outer">
        {inProgress && <h1>Loading...</h1>}
        <div className="list-title">
          <h1>{data.name}</h1>
          <div className="create-new">
            <input
              type="text"
              placeholder="Enter name here..."
              onChange={this.handleChange}
              value={this.state.name}
            ></input>
            <button onClick={this.handleSubmit}>Create</button>
          </div>
        </div>

        <div className="items-list">
          {data.users &&
            data.users.length > 0 &&
            data.users.map((user) => <User user={user} />)}
        </div>
        <div>
          <Link to={`/solution/${this.props.trip.data._id}`}>Calculate</Link>
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

export default connect(mapStateToProps)(Trip);
