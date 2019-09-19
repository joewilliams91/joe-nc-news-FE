import React, { Component } from "react";
import * as api from "./api";
import Icon from "./Icons";

export default class Comment extends Component {
  state = {
    vote: 0,
    err: null
  };

  commentVote = inc_votes => {
    const { comment_id } = this.props.comment;
    const patch = { inc_votes };
    this.setState(currentState => {
      const newState = {
        ...currentState,
        vote: currentState.vote + inc_votes
      };
      return newState;
    });
    api.patchComment(comment_id, patch).catch(err => {
      this.setState({ err });
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.comment.votes !== this.props.comment.votes) {
      this.setState({ vote: 0 });
    }
  }

  render() {
    const { comment_id, author, created_at, body, votes } = this.props.comment;
    const { username } = this.props.user;
    const { vote } = this.state;
    return (
      <div className="comment-box" key={comment_id}>
        <p className="comment-box-body">{body}</p>
        <div className="comment-box-info">
          <div className="comment-box-info-content">
            <h4 className="comment-box-author">
              Posted by: {author} on{" "}
              {new Date(created_at).toString().slice(0, 24)}
            </h4>
            <p className="comment-box-votes-info">Votes: {votes + vote}</p>
          </div>

          <div className="comment-box-vote-buttons">
            <button
              onClick={
                vote < 1 && username
                  ? () => {
                      this.commentVote(1);
                    }
                  : null
              }
              className="comment-box-button"
              value="1"
            >
              <Icon icon="up" />
            </button>
            <button
              onClick={
                vote > -1 && username
                  ? () => {
                      this.commentVote(-1);
                    }
                  : null
              }
              className="comment-box-button"
              value="-1"
            >
              <Icon icon="down" />
            </button>
          </div>
          {username === author && (
            <div className="delete-button-area">
              <button
                className="delete-button"
                onClick={() => this.props.deleteComment(comment_id)}
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
