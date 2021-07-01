import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Navbar, Home, SignIn, SignUp, Trip } from "./index";
import { successLogIn } from "../actions/auth";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { getTripsList } from "../actions/auth";

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);

      this.props.dispatch(getTripsList(user.email));

      console.log(user);

      this.props.dispatch(
        successLogIn({
          name: user.name,
          _id: user._id,
          email: user.email,
          password: user.password,
          tripsList: [],
        })
      );
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} />;
              }}
            />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/trip/:tripId" component={Trip} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
