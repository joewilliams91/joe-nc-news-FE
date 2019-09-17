import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";

export default class ArticleBody extends Component {
  state = {
    article: {},
    hasVoted: false,
    isLoading: true
  };

  fetchData = () => {
    const { article_id } = this.props;
    api.getArticle(article_id).then(({ article }) => {
      this.setState({ article, isLoading: false });
    });
  };

  articleVote = event => {
    event.preventDefault();
    const { article_id } = this.props;
    const inc_votes = +event.target.value;
    const patch = { inc_votes };
    api.patchArticle(article_id, patch).then(data => {
      this.setState({ hasVoted: true });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.newComment !== this.props.newComment ||
      prevProps.deletedComment !== this.props.deletedComment ||
      prevState.hasVoted !== this.state.hasVoted ||
      prevState.hasVoted !== this.state.hasVoted
    ) {
      this.fetchData();
    }
  }

  render() {
    const {
      author,
      article_id,
      title,
      topic,
      body,
      created_at,
      votes,
      comment_count
    } = this.state.article;
    const { isLoading, hasVoted } = this.state;
    const { username } = this.props.user;
    return isLoading ? (
      <p>Loading</p>
    ) : (
      <div className="article-body-box" key={article_id}>
        <div className="article-body-header">
          <div className="article-body-box-title">
            <h1>{title}</h1>
          </div>
          <Link to={`/topics/${topic}`} className="article-body-box-topic">
            <h3>NC/{topic}</h3>
          </Link>
        </div>
        <div className="article-body-box-post-info">
          <h4>
            Posted by {author} on {new Date(created_at).toString().slice(0, 24)}
          </h4>
        </div>

        <div className="article-body-body">
          <p id="article-body-body-text">{body}</p>
        </div>
        <div className="article-body-box-footer">
          <div className="article-body-box-count-area">
            <p>
              Comments: {comment_count} Votes: {votes}
            </p>
          </div>

          <div className="article-body-box-votes">
            <button
              value="1"
              onClick={!hasVoted && username ? this.articleVote : null}
            >
              Upvote
            </button>{" "}
            ||{" "}
            <button
              value="-1"
              onClick={!hasVoted && username ? this.articleVote : null}
            >
              Downvote
            </button>
          </div>
        </div>
      </div>
    );
  }
}
