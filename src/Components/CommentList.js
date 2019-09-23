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
    const { article_id, addError } = this.props;
    const { selectedParams, page } = this.state;
    const params = { params: { ...selectedParams, p: page } };
    api
      .getComments(article_id, params)
      .then(comments => {
        this.setState(currentState => {
          return {
            ...currentState,
            isLoading: false,
            comments:
              currentState.page === 1
                ? comments
                : [...currentState.comments, ...comments]
          };
        });
      })
      .catch(({ response }) => {
        addError(response);
      });
  };

  updateComments = comment_id => {
    const {commentDeleter} = this.props;
    commentDeleter(comment_id);
        this.setState(currentState => {
          const newComments = currentState.comments.filter(
            comment => comment.comment_id !== comment_id
          );
          const newState = { ...currentState, comments: newComments };
          return newState;
        });

  }

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
    const { user, commentCount, addError } = this.props;
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
              addError={addError}
              updateComments={this.updateComments}
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
