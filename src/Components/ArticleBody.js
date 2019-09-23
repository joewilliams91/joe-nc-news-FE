import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import Voter from "./Voter.js";
import * as api from "./api";
import Icon from "./Icons";

export default class ArticleBody extends Component {
  state = {
    article: {},
    isLoading: true,
    vote: 0
  };

  fetchData = () => {
    const { article_id, addError, getCommentCount } = this.props;
    api
      .getArticle(article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
        const { comment_count } = article;
        getCommentCount(comment_count);
      })
      .catch(({ response }) => {
        addError(response);
      });
  };

  voteChange = inc_votes => {
    this.setState(currentState => {
      const newState = {
        ...currentState,
        vote: currentState.vote + inc_votes
      };
      return newState;
    });
  };

  deleteArticle = article_id => {
    const { addError } = this.props;
    api
      .deleteArticle(article_id)
      .then(() => {
        navigate("/");
      })
      .catch(({ response }) => {
        addError(response);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.newComment !== this.props.newComment ||
      prevProps.deletedComment !== this.props.deletedComment
    ) {
      this.fetchData();
    } 
    // else if (prevProps.user.username !== this.props.user.username) {
    //   this.setState({ vote: 0 });
    // }
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
    const { addError } = this.props;
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
            <Voter
              username={username}
              vote={vote}
              voteChange={this.voteChange}
              name="article-body-voter"
              addError={addError}
              article_id={article_id}
            />
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
            {username === author && (
              <div className="delete-article-area">
                {" "}
                <button
                  className="delete-article-area-button"
                  onClick={() => this.deleteArticle(article_id)}
                >
                  <Icon icon="delete" />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}
