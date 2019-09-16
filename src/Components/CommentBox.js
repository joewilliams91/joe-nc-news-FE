import React, { Component } from "react";

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
    this.props.postNewComment(this.state.commentBody);
    this.setState({ commentBody: "" });
  };

  render() {
    return (
      <div className="article-comment-box-area">
        <h2 className="article-comment-box-header">Leave a comment: </h2>
        {this.props.user.username ? (
          <form
            className="article-comment-box-form"
            onSubmit={this.addNewComment}
          >
            <textarea
            placeholder="Leave a comment..."
              value={this.state.commentBody}
              onChange={this.handleInput}
              className="article-comment-box-input"
            ></textarea>
            <button id="article-comment-box-button">Post</button>
          </form>
        ) : (
          <form
            className="article-comment-box-form"
            onSubmit={this.addNewComment}
          >
            <textarea
              readOnly
              placeholder="Please login to leave a comment!"
              value={this.state.commentBody}
              onChange={this.handleInput}
              className="article-comment-box-input"
            ></textarea>
          </form>
        )}
      </div>
    );
  }
}
