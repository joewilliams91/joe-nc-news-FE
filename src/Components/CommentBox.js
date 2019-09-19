import React, { Component } from "react";
import * as api from "./api";

export default class CommentBox extends Component {
  state = {
    commentBody: ""
  };

  handleInput = event => {
    const { value } = event.target;
    this.setState({ commentBody: value });
  };
  addNewComment = event => {
    event.preventDefault();
    const { article_id, user, newCommentAdder, errorAdder } = this.props;
    const { commentBody } = this.state;
    const newComment = { username: user.username, body: commentBody };
    api
      .addComment(article_id, newComment)
      .then(({ comment }) => {
        this.setState({ commentBody: "" });
        newCommentAdder(comment);
      })
      .catch(({ response }) => {
        errorAdder(response);
      });
  };

  render() {
    const { commentBody } = this.state;
    return (
      <div className="article-comment-box-area">
        <div className="article-comment-box-header">
          <h2>Leave a comment: </h2>
        </div>
        {this.props.user.username ? (
          <form
            className="article-comment-box-form"
            onSubmit={this.addNewComment}
          >
            <textarea
              placeholder="Leave a comment..."
              value={commentBody}
              onChange={this.handleInput}
              className="article-comment-box-input"
            ></textarea>
            <button id="article-comment-box-button">Post</button>
          </form>
        ) : (
          <form className="article-comment-box-form">
            <textarea
              readOnly
              placeholder="Please login to leave a comment!"
              value={this.state.commentBody}
              className="article-comment-box-input"
            ></textarea>
          </form>
        )}
      </div>
    );
  }
}
