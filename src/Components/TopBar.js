import React from "react";
import { Link } from "@reach/router";
import * as api from "./api";

class TopBar extends React.Component {
  state = {
    selectedUser: ""
  };

  userLogin = event => {
    event.preventDefault();
    const { selectedUser } = this.state;
    const { addError, setUser } = this.props;
    if (selectedUser) {
      api
        .getUser(selectedUser)
        .then(user => {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch(({ response }) => {
          addError(response);
        });
    }
  };

  userLogout = event => {
    event.preventDefault();
    const { setUser } = this.props;
    this.setState({ selectedUser: "" });
    localStorage.setItem("user", JSON.stringify({}));
    setUser();
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ selectedUser: value });
  };

  render() {
    const { selectedUser } = this.state;
    const { user } = this.props;
    return (
      <div className="topbar">
        <h1 className="logo">
          <Link className="link" to="/">
            NC News
          </Link>
        </h1>
        {user.username ? (
          <div className="user-details">
            <img
              className="user-url"
              src={user.avatar_url}
              alt="user avatar_url"
            ></img>
            <h3 className="top-bar-message">Welcome {user.name}!</h3>
            <button id="logout-button" onClick={this.userLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="login-section">
            <h3 className="login-dropdown-message">Login:</h3>
            <form className="login-dropdown" onSubmit={this.userLogin}>
              <select
                value={selectedUser}
                onChange={this.handleChange}
                name="users"
              >
                <option value="">--Please login--</option>
                <option value="jessjelly">jessjelly</option>
                <option value="weegembump">weegembump</option>
                <option value="happyamy2016">happyamy2016</option>
                <option value="grumpy19">grumpy19</option>
                <option value="tickle122">tickle122</option>
                <option value="cooljmessy">cooljmessy</option>
              </select>
              <button id="login-button" type="submit" value="submit">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default TopBar;
