import React, { Component } from "react";
import { connect } from "react-redux";
import { createTrip } from "../actions/auth";

class CreateTrip extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(
      createTrip(this.props.auth.user.email, this.state.name)
    );
  };

  render() {
    return (
      <div>
        <div className="trip">
          <input
            type="text"
            placeholder="Enter Your Title Name Here....."
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Create</button>
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

export default connect(mapStateToProps)(CreateTrip);
