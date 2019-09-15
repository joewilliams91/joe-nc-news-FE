import React from "react";
import { Link } from "@reach/router";

class TopBar extends React.Component {
  state = {
    user: {}
  };
  render() {
    return (
      <div className="topbar">
        <h1 className="logo">
          <Link className="link" to="/">
            NC News
          </Link>
        </h1>
        <h3 className="user-details">User:</h3>
        <div className="login-section">
          <h3>Login</h3>
        </div>
      </div>
    );
  }
}

export default TopBar;
