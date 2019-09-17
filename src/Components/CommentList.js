import React, { Component } from "react";
import * as api from "./api";
import Comment from "./Comment";
import CommentSort from "./CommentSort";

export default class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    isDeleted: false,
    selectedParams: {},
    page: 1
  };

  fetchData = () => {
    const { article_id } = this.props;
    const { selectedParams, page } = this.state;
    const params = { params: { ...selectedParams, p: page } };
    api.getComments(article_id, params).then(({ comments }) => {
      this.setState({ comments, isLoading: false });
    });
  };

  fetchMoreData = () => {
    const { article_id } = this.props;
    const { selectedParams, page } = this.state;
    const params = { params: { ...selectedParams, p: page } };
    api.getComments(article_id, params).then(({ comments }) => {
      this.setState(currentState => {
        const newState = {
          ...currentState,
          comments: [...currentState.comments, ...comments]
        };
        return newState;
      });
    });
  };

  deleteComment = comment_id => {
    const { commentDeleter } = this.props;
    api.deleteComment(comment_id).then(data => {
      this.setState({ isDeleted: true });
      commentDeleter(comment_id);
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
      prevState.selectedParams.order !== this.state.selectedParams.order
    ) {
      this.fetchData();
    } else if (prevState.isDeleted !== this.state.isDeleted) {
      this.fetchData();
      this.setState({ isDeleted: false });
    } else if (
      prevState.page !== this.state.page &&
      this.state.page - prevState.page === 1
    ) {
      this.fetchMoreData();
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
    const { user, article } = this.props;
    return isLoading === false ? (
      <div className="article-comment-list">
        <CommentSort
          commentSort={this.commentSort}
          selectedParams={selectedParams}
        />
        {comments.map(comment => {
          return (
            <Comment
              comment={comment}
              key={comment.comment_id}
              user={user}
              deleteComment={this.deleteComment}
            />
          );
        })}
        <div className="article-page-footer">
          {article && (page - 1) * 10 < +article.comment_count ? (
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
