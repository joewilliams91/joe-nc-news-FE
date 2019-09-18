import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";

export default class ArticlesFilter extends Component {
  state = {
    topics: []
  };

  fetchTopics = () => {
    api.getTopics().then(({ topics }) => {
      this.setState({ topics });
    });
  };

  componentDidMount() {
    this.fetchTopics();
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
        <div className="filter-topic-topics">
          <p>Filter by topic:</p>
          <Link to={`/`} className="filter-topic-topic">
            <p>All topics</p>
          </Link>
          {topics.map(topic => {
            const { slug } = topic;
            return (
              <Link
                to={`/topics/${slug}`}
                key={slug}
                className="filter-topic-topic"
              >
                <p>{slug.slice(0, 1).toUpperCase() + slug.slice(1)}</p>
              </Link>
            );
          })}
        </div>
        <div className="sort-bar">
          <div className="sort-bar-header">
            <p>Sort articles:</p>
          </div>
          <div className="filter-dropdown">
            <form>
              <select
                onChange={this.sortBy}
                value={JSON.stringify(selectedParams)}
                className="filter-dropdown-bar"
              >
                <option value={JSON.stringify({})}>--Sort by--</option>
                <option
                  value={JSON.stringify({
                    sort_by: "created_at",
                    order: "desc"
                  })}
                >
                  --Newest to oldest--
                </option>
                <option
                  value={JSON.stringify({
                    sort_by: "created_at",
                    order: "asc"
                  })}
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
      </div>
    );
  }
}
