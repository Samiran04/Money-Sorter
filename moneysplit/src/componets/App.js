import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  Navbar,
  Home,
  SignIn,
  SignUp,
  Trip,
  Solution,
  Settings,
} from "./index";
import { successLogIn } from "../actions/auth";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { getTripsList } from "../actions/auth";

const PrivateRoute = (PrivateRouteProps) => {
  const { isLoggedIn, component: Component, path } = PrivateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

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
    const { isLoggedIn } = this.props.auth;
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
            <Route
              path="/trip/:tripId"
              render={(props) => {
                return <Trip {...props} />;
              }}
            />
            <Route
              path="/solution/:id"
              render={(props) => {
                return <Solution {...props} />;
              }}
            />
            <PrivateRoute
              isLoggedIn={isLoggedIn}
              component={Settings}
              path="/users/:userId"
            />
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
