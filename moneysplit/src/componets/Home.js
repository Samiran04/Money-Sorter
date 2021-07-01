import React, { Component } from "react";
import { CreateTrip } from "./index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { TripList } from "./index";

class Home extends Component {
  render() {
    const { isLoggedIn, tripsList } = this.props.auth;

    const { from } = this.props.location.state || {
      from: { pathname: "/sign-in" },
    };

    if (!isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <CreateTrip />
        {tripsList.length > 0 &&
          tripsList.map((trip) => <TripList trip={trip} key={trip._id} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
