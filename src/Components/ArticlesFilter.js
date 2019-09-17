import React, { Component } from "react";
import * as api from "./api";
import { Link } from "@reach/router";

export default class ArticlesFilter extends Component {
  state = {
    topics: []
  };
  fetchData = () => {
    api.getTopics().then(({ topics }) => {
      this.setState({ topics });
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  sortBy = event => {
    const sort = JSON.parse(event.target.value);
    this.props.articleSort(sort);
  };
  render() {
    const { topics } = this.state;
    const { selectedParams } = this.props;
    return (
      <div className="filter-topic-container">
        <p className="filter-topic-header">Filter by topic:</p>
        <div className="filter-topic-topics">
          <Link to={`/`} className="filter-topic-topic link">
            <p>All topics</p>
          </Link>
          {topics.map(topic => {
            const { slug } = topic;
            return (
              <Link to={`/topics/${slug}`} key={slug} className="filter-topic-topic">
                <p>{slug.slice(0, 1).toUpperCase() + slug.slice(1)}</p>
              </Link>
            );
          })}
        </div>
        <p className="sort-bar-header">Sort articles:</p>
        <div className="sort-bar">
          <form className="login-dropdown">
            <select onChange={this.sortBy} value={JSON.stringify(selectedParams)}>
              <option value={JSON.stringify({})}>--Sort by--</option>
              <option
                value={JSON.stringify({ sort_by: "created_at", order: "desc" })}
              >
                --Newest to oldest--
              </option>
              <option
                value={JSON.stringify({ sort_by: "created_at", order: "asc" })}
              >
                --Oldest to newest--
              </option>
              <option
                value={JSON.stringify({
                  sort_by: "comment_count",
                  order: "desc"
                })}
              >
                --Comment count: high to low--
              </option>
              <option
                value={JSON.stringify({
                  sort_by: "comment_count",
                  order: "asc"
                })}
              >
                --Comment count: low to high--
              </option>
              <option
                value={JSON.stringify({ sort_by: "votes", order: "desc" })}
              >
                --Vote count: high to low--
              </option>
              <option
                value={JSON.stringify({ sort_by: "votes", order: "asc" })}
              >
                --Vote count: low to high--
              </option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}
