import React, { Component } from "react";
import * as api from "./api";
import { Link } from "@reach/router";

export default class ArticlesFilter extends Component {
  state = {
    topics: []
  };
  fetchData = () => {
    api.getData("topics").then(({ topics }) => {
      this.setState({ topics });
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { topics } = this.state;
    return (
      <div className="filter-topic-container">
        <p className="filter-topic-header">Filter by topic:</p>
        <div className="filter-topic-topics" >
          <Link to={`/`} className="filter-topic-topic" className="link">
            <p>All topics</p>
          </Link>
          {topics.map(topic => {
            const { slug } = topic;
            return (
              <Link to={`/topics/${slug}`}  className="filter-topic-topic" >
                <p>{slug.slice(0, 1).toUpperCase() + slug.slice(1)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
