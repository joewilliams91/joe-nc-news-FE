import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import TopBar from "./Components/TopBar";
import Articles from "./Components/Articles";
import ArticlePage from "./Components/ArticlePage";
import ErrorHandler from "./Components/ErrorHandler";

class App extends React.Component {
  state = {
    user: {},
    err: null
  };
  login = user => {
    this.setState({ user });
  };
  logout = () => {
    this.setState({ user: {} });
  };
  errorAdder = err => {
    this.setState({ err });
  };

  render() {
    const { user, err } = this.state;

    return (
      <div className="App">
        <TopBar
          logout={this.logout}
          login={this.login}
          errorAdder={this.errorAdder}
        />
        {err && <ErrorHandler {...err} />}
        <Router>
          <Articles user={user} path="/" className="articles" />
          <Articles user={user} path="/topics/:topic_id" />
          <ArticlePage user={user} path="article/:article_id" />
          <ErrorHandler default status={404} msg="Page not found" />
        </Router>
      </div>
    );
  }
}

export default App;
