import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTrip } from "../actions/trip";

class TripList extends Component {
  handleDelete = (e) => {
    e.preventDefault();

    this.props.dispatch(deleteTrip(this.props.trip._id));
  };
  render() {
    return (
      <div className="trip-wrapper">
        <Link to={`/trip/${this.props.trip._id}`}>
          <div className="trip-header">
            <div className="trip-content">{this.props.trip.name}</div>
            <div className="delete-trip" onClick={this.handleDelete}>
              X
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dispatch: state.trip.dispatch,
  };
}

export default connect(mapStateToProps)(TripList);
