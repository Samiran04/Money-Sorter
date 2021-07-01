import React, { Component } from "react";
import { Link } from "react-router-dom";

class TripList extends Component {
  render() {
    return (
      <div className="trip-wrapper">
        <Link to={`/trip/${this.props.trip._id}`}>
          <div className="trip-header">
            <div className="trip-content">{this.props.trip.name}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default TripList;
