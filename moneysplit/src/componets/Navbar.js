import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <div className="left-nav">
            <h1>Money Split</h1>
          </div>
          <div className="right-nav">
            <div className="nav-links">
              <ul>
                <li>Log In</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
