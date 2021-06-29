import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Navbar, Home, SignIn, SignUp } from "./index";
import { successLogIn } from "../actions/auth";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);

      this.props.dispatch(
        successLogIn({
          name: user.name,
          _id: user._id,
          email: user.email,
          password: user.password,
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
