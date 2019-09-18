import React, { Component } from "react";
import * as api from "./api";

export default class ArticleAdder extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    topics: []
  };
  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api.getTopics().then(({ topics }) => {
      this.setState({ topics });
    });
  };

  handleTopicChange = event => {
    const { value } = event.target;
    this.setState({ topic: value });
  };
  handleInput = event => {
    const { value, name } = event.target;
    if (name === "title") {
      this.setState({ title: value });
    } else {
      this.setState({ body: value });
    }
  };
  submitArticle = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const { newArticleAdder } = this.props;
    const { username } = this.props.user;
    if (title && body && topic) {
      const newArticle = { title, body, topic, author: username };
      api.addArticle(newArticle).then(({ article }) => {
        this.setState({ title: "", body: "", topic: "" });
        newArticleAdder(article);
      });
    }
  };

  render() {
    const { topics, topic, body, title } = this.state;
    const { user } = this.props;
    return (
      <div className="new-article-form">
        <h2 className="new-article-head">Add a new article:</h2>

        <form onSubmit={this.submitArticle}>
          <div className="new-article-header">
            <label>Select topic:</label>
            <select value={topic} onChange={this.handleTopicChange}>
              <option value="">---Topics---</option>
              {topics.map(topic => {
                const { slug } = topic;
                return (
                  <option value={slug} key={slug}>
                    {slug.slice(0, 1).toUpperCase() + slug.slice(1)}
                  </option>
                );
              })}
            </select>
            <label className="new-article-title">
              Title:
              <input
                name="title"
                className="new-article-title-input"
                value={title}
                onChange={this.handleInput}
                type="text"
              ></input>
            </label>
          </div>
          {user.username ? (
            <label className="new-article-body">
              Article body:{" "}
              <textarea
                className="new-article-text-area"
                value={body}
                name="body"
                onChange={this.handleInput}
              ></textarea>
            </label>
          ) : (
            <label className="new-article-body">
              Article body:{" "}
              <textarea
                className="new-article-text-area"
                placeholder="You must be logged in to post an article..."
                value={body}
                name="body"
                onChange={this.handleInput}
              ></textarea>
            </label>
          )}
          {user.username && (
            <div className="new-article-footer">
              <button className="new-article-button">Submit</button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
