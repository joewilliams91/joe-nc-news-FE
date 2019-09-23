import Icon from "./Icons";
import React, { Component } from "react";
import * as api from "./api";

export default class Voter extends Component {
  state = {
    isRequesting: false
  };

  voteRequest = inc_votes => {
    const { addError, article_id, comment_id, voteChange, name } = this.props;
    const patch = { inc_votes };
    this.setState({ isRequesting: true });
    voteChange(inc_votes);
    api
      .patchVotes(
        article_id || comment_id,
        patch,
        name === "comment-voter" ? "comment" : "article"
      )
      .then(() => {
        this.setState({ isRequesting: false });
      })
      .catch(({ response }) => {
        addError(response);
      });
  };

  render() {
    const { username, vote, name } = this.props;
    const { isRequesting } = this.state;
    return (
      <div
        className={
          name === "article-body-voter"
            ? "article-body-box-votes"
            : name === "comment-voter"
            ? "comment-box-vote-buttons"
            : "article-box-votes"
        }
      >
        <button
          className={
            !username
              ? `${
                  name === "article-body-voter"
                    ? "no-user-thread-vote-"
                    : name === "comment-voter"
                    ? "no-user-comment-box-"
                    : "no-user-vote-"
                }button`
              : `${
                  name === "article-body-voter"
                    ? "thread-vote-"
                    : name === "comment-voter"
                    ? "comment-box-"
                    : "vote-"
                }button`
          }
          value="1"
          onClick={
            isRequesting
              ? null
              : vote < 1 && username
              ? () => {
                  this.voteRequest(1);
                }
              : null
          }
        >
          <Icon icon="up" />
        </button>
        <button
          className={
            !username
              ? `${
                  name === "article-body-voter"
                    ? "no-user-thread-vote-"
                    : name === "comment-voter"
                    ? "no-user-comment-box-"
                    : "no-user-vote-"
                }button`
              : `${
                  name === "article-body-voter"
                    ? "thread-vote-"
                    : name === "comment-voter"
                    ? "comment-box-"
                    : "vote-"
                }button`
          }
          value="-1"
          onClick={
            isRequesting
              ? null
              : vote > -1 && username
              ? () => {
                  this.voteRequest(-1);
                }
              : null
          }
        >
          <Icon icon="down" />
        </button>
      </div>
    );
  }
}
