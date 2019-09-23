import React, { Component } from "react";
import * as api from "./api";
import Icon from "./Icons";
import Voter from "./Voter";

export default class Comment extends Component {
  state = {
    vote: 0,
    isDeleting: false
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

  deleteComment = comment_id => {
    const { addError, updateComments } = this.props;
    this.setState({ isDeleting: true });
    api
      .deleteComment(comment_id)
      .then(() => {
        updateComments(comment_id);
        this.setState({ isDeleting: false });
      })
      .catch(({ response }) => {
        addError(response);
      });
  };

  render() {
    const { comment_id, author, created_at, body, votes } = this.props.comment;
    const { username } = this.props.user;
    const { addError } = this.props;
    const { vote, isDeleting } = this.state;
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
          <Voter
            username={username}
            vote={vote}
            voteChange={this.voteChange}
            name="comment-voter"
            addError={addError}
            comment_id={comment_id}
          />
          {username === author && (
            <div className="delete-button-area">
              <button
                className="delete-button"
                onClick={() =>
                  username && !isDeleting
                    ? this.deleteComment(comment_id)
                    : null
                }
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
