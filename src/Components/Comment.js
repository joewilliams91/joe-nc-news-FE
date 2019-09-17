import React, { Component } from "react";
import * as api from "./api";

export default class Comment extends Component {
  state = {
    votes: 0,
    hasVoted: false
  };

  componentDidMount() {
    const { votes } = this.props.comment;
    this.setState({ votes });
  }

  commentVote = event => {
    event.preventDefault();
    const { comment_id } = this.props.comment;
    const inc_votes = +event.target.value;
    const patch = { inc_votes };
    api.patchComment(comment_id, patch).then(data => {
      this.setState(currentState => {
        const newState = {
          ...currentState,
          hasVoted: true,
          votes: currentState.votes + inc_votes
        };
        return newState;
      });
    });
  };

  render() {
    const { comment_id, author, created_at, body } = this.props.comment;
    const { username } = this.props.user;
    const { hasVoted, votes } = this.state;
    return (
      <div className="comment-box" key={comment_id}>
        <p className="comment-box-body">{body}</p>
        <div className="comment-box-info">
          <p className="comment-box-author">
            Posted by: {author} on{" "}
            {new Date(created_at).toString().slice(0, 24)}
          </p>
          <p className="comment-box-votes-info">Votes: {votes}</p>
          <div className="comment-box-vote-buttons">
            <button
              onClick={!hasVoted && username ? this.commentVote : null}
              className="comment-box-button"
              value="1"
            >
              Upvote
            </button>
            <button
              onClick={!hasVoted && username ? this.commentVote : null}
              className="comment-box-button"
              value="-1"
            >
              Downvote
            </button>
            {username === author && (
              <button
                onClick={() => this.props.deleteComment(comment_id)}
                className="comment-box-button"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
