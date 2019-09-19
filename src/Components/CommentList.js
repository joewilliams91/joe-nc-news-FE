import React, { Component } from "react";
import * as api from "./api";
import Comment from "./Comment";
import CommentSort from "./CommentSort";

export default class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    selectedParams: {},
    page: 1
  };

  fetchData = () => {
    const { article_id, errorAdder } = this.props;
    const { selectedParams, page } = this.state;
    const params = { params: { ...selectedParams, p: page } };
    if (page === 1) {
      api
        .getComments(article_id, params)
        .then(({ comments }) => {
          this.setState({ comments, isLoading: false });
        })
        .catch(({ response }) => {
          errorAdder(response);
        });
    } else {
      api
        .getComments(article_id, params)
        .then(({ comments }) => {
          this.setState(currentState => {
            const newState = {
              ...currentState,
              comments: [...currentState.comments, ...comments]
            };
            return newState;
          });
        })
        .catch(({ response }) => {
          errorAdder(response);
        });
    }
  };

  deleteComment = comment_id => {
    const { commentDeleter, errorAdder } = this.props;
    api
      .deleteComment(comment_id)
      .then(() => {
        commentDeleter(comment_id);
        this.setState(currentState => {
          const newComments = currentState.comments.filter(
            comment => comment.comment_id !== comment_id
          );
          const newState = { ...currentState, comments: newComments };
          return newState;
        });
      })
      .catch(({ response }) => {
        errorAdder(response);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newComment !== this.props.newComment) {
      this.fetchData();
      this.setState({ selectedParams: {} });
    } else if (
      prevState.selectedParams.sort_by !== this.state.selectedParams.sort_by ||
      prevState.selectedParams.order !== this.state.selectedParams.order ||
      (prevState.page !== this.state.page &&
        this.state.page - prevState.page === 1)
    ) {
      this.fetchData();
    }
  }

  commentSort = selectedParams => {
    this.setState({ selectedParams, page: 1 });
  };

  nextPage = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  render() {
    const { comments, isLoading, selectedParams, page } = this.state;
    const { user, commentCount, errorAdder } = this.props;
    return isLoading === false ? (
      <div className="article-comment-list">
        <div className="comments-header">
          <h3 className="comments-title">Comments:</h3>
          <div className="comments-sort-bar">
            <CommentSort
              commentSort={this.commentSort}
              selectedParams={selectedParams}
            />
          </div>
        </div>
        {comments.map(comment => {
          return (
            <Comment
              comment={comment}
              key={comment.comment_id}
              user={user}
              deleteComment={this.deleteComment}
              errorAdder={errorAdder}
            />
          );
        })}
        <div className="article-page-footer">
          {commentCount && page * 10 < +commentCount ? (
            <button onClick={this.nextPage} id="load-more-comments-button">
              Load More
            </button>
          ) : (
            <p>No more comments!</p>
          )}
        </div>
      </div>
    ) : (
      <h2 className="article-comment-list">Loading...</h2>
    );
  }
}
