import React, { Component } from "react";

class Trip extends Component {
  render() {
    return (
      <div className="trip-wrapper">
        <div className="trip-header">
          <div className="trip-content">{this.props.trip.name}</div>
        </div>
      </div>
    );
  }
}

export default Trip;
