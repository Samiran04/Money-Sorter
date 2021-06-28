import React, { Component } from "react";

class Trip extends Component {
  render() {
    return (
      <div>
        <div className="trip">
          <input type="text" placeholder="Enter Your Title Name Here....." />
          <button>Create</button>
        </div>
      </div>
    );
  }
}

export default Trip;
