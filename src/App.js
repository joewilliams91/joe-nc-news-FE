import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import TopBar from "./Components/TopBar";
import Articles from "./Components/Articles";
import ArticlePage from "./Components/ArticlePage"

function App() {
  return (
    <div className="App">
      <TopBar />
      <Router>
        <Articles path="/*" className="articles" />
        <Articles path="/topics/:topic_id" />
        <ArticlePage path="article/:article_id" />
      </Router>
    </div>
  );
}

export default App;
