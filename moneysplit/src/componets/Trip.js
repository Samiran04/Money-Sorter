import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrip } from "../actions/trip";

class Trip extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;

    const { tripId } = params;

    dispatch(getTrip(tripId));
  }
  render() {
    const { data, inProgress } = this.props.trip;
    return (
      <div>
        {inProgress && <h1>Loading...</h1>}
        <div>
          <h1>{data.name}</h1>
        </div>
        <div>
          <input type="text" placeholder="Enter name here..."></input>
          <button>Create</button>
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
