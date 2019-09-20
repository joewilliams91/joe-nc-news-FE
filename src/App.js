import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import TopBar from "./Components/TopBar";
import Articles from "./Components/Articles";
import ArticlePage from "./Components/ArticlePage";
import ErrorHandler from "./Components/ErrorHandler";
import * as api from "./Components/api";

class App extends React.Component {
  state = {
    user: {},
    err: null,
    topics: []
  };

  setUser = user => {
    this.setState({user: user ? user : {}})
  }

  fetchTopics = () => {
    api.getTopics().then(topics  => {
      this.setState({ topics });
    });
  };

  componentDidMount() {
    this.fetchTopics();
  }

  addError = err => {
    this.setState({ err });
  };

  render() {
    const { user, err, topics } = this.state;

    return (
      <div className="App">
        <TopBar
          setUser={this.setUser}
          addError={this.addError}
          user={user}
        />
        {err && <ErrorHandler {...err} />}
        <Router>
          <Articles topics={topics} user={user} path="/" className="articles" />
          <Articles topics={topics} user={user} path="/topics/:topic_id" />
          <ArticlePage user={user} path="article/:article_id" />
          <ErrorHandler default status={404} msg="Page not found" />
        </Router>
      </div>
    );
  }
}

export default App;
