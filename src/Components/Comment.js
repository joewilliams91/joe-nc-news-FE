import React, { Component } from "react";

export default class Comment extends Component {
  state = {
    votes: 0,
    hasVoted: false
  };
  render() {
    const {
      comment_id,
      author,
      article_id,
      votes,
      created_at,
      body
    } = this.props.comment;
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
            <button className="comment-box-button">Upvote</button> ||{" "}
            <button className="comment-box-button">Downvote</button>
          </div>
        </div>
      </div>
    );
  }
}
