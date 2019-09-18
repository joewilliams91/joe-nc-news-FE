import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";
import Icon from "./Icons";

export default class ArticleBody extends Component {
  state = {
    article: {},
    err: null,
    isLoading: true,
    vote: 0
  };

  fetchData = () => {
    const { article_id, errorAdder, getCommentCount } = this.props;
    api
      .getArticle(article_id)
      .then(({ article }) => {
        const { comment_count } = article;
        this.setState({ article, isLoading: false });
        getCommentCount(comment_count);
      })
      .catch(({ response }) => {
        errorAdder(response);
      });
  };

  articleVote = inc_votes => {
    const { article_id } = this.props;
    const patch = { inc_votes };
    this.setState(currentState => {
      const newState = {
        ...currentState,
        vote: currentState.vote + inc_votes
      };
      return newState;
    });
    api.patchArticle(article_id, patch).catch(err => {
      this.setState({ err });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.newComment !== this.props.newComment ||
      prevProps.deletedComment !== this.props.deletedComment
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
    const { isLoading, vote } = this.state;
    const { username } = this.props.user;
    if (isLoading) {
      return (
        <div className="article-body-box" key={article_id}>
          <div className="article-body-body">
            <h2 id="article-body-body-text">Loading...</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="article-body-box" key={article_id}>
          <div className="article-body-header">
            <div className="article-body-icon">
              <Icon icon={topic} />
            </div>
            <div className="article-body-box-title">
              <h1>{title}</h1>
            </div>
            <Link to={`/topics/${topic}`} className="article-body-box-topic">
              <h3>NC/{topic}</h3>
            </Link>
          </div>
          <div className="article-body-body">
            <p id="article-body-body-text">{body}</p>
          </div>
          <div className="article-body-box-content">
            <div className="article-body-box-votes">
              <button
                className="thread-vote-button"
                value="1"
                onClick={
                  vote < 1 && username
                    ? () => {
                        this.articleVote(1);
                      }
                    : null
                }
              >
                <Icon icon="up" />
              </button>
              <button
                className="thread-vote-button"
                value="-1"
                onClick={
                  vote > -1 && username
                    ? () => {
                        this.articleVote(-1);
                      }
                    : null
                }
              >
                <Icon icon="down" />
              </button>
            </div>
            <div className="article-body-box-footer">
              <div className="article-body-box-count-area">
                <p>
                  Comments: {comment_count} Votes: {votes + vote}
                </p>
              </div>

              <h4 className="article-body-box-post-info">
                Posted by {author} on{" "}
                {new Date(created_at).toString().slice(0, 24)}
              </h4>
            </div>
          </div>
        </div>
      );
    }
  }
}
