import React, { Component } from "react";

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <span>{user.name}</span>
        <span>{user.money}</span>
      </div>
    );
  }
}

export default User;
