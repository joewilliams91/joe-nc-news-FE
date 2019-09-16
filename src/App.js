import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import TopBar from "./Components/TopBar";
import Articles from "./Components/Articles";
import ArticlePage from "./Components/ArticlePage";

class App extends React.Component {
  state = {
    user: {}
  };
  login = user => {
    this.setState({ user });
  };
  logout = () => {
    this.setState({ user: {} });
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <TopBar logout={this.logout} login={this.login} />
        <Router>
          <Articles user={user} path="/*" className="articles" />
          <Articles user={user} path="/topics/:topic_id" />
          <ArticlePage user={user} path="article/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
