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
        <form
          className="article-comment-box-form"
          onSubmit={this.addNewComment}
        >
          <input
            value={this.state.commentBody}
            onChange={this.handleInput}
            type="text"
            className="article-comment-box-input"
          ></input>
          <button id="article-comment-box-button">Post</button>
        </form>
      </div>
    );
  }
}
