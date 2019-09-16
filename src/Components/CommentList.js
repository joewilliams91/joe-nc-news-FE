import React, { Component } from "react";
import * as api from "./api";
import Comment from "./Comment";
import CommentSort from "./CommentSort";

export default class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    isDeleted: false,
    selectedParams: {}
  };

  fetchData = () => {
    const { article_id } = this.props;
    const endpoint = `articles/${article_id}/comments`;
    api.getData(endpoint).then(({ comments }) => {
      this.setState({ comments, isLoading: false });
    });
  };

  sortData = () => {
    const { article_id } = this.props;
    const endpoint = `articles/${article_id}/comments`;
    const { selectedParams } = this.state;
    const params = { params: { ...selectedParams } };
    api.getData(endpoint, params).then(({ comments }) => {
      this.setState({ comments, isLoading: false });
    });
  };

  fetchMoreData = () => {
    const { article_id, page } = this.props;
    const params = { params: { p: page } };
    const endpoint = `articles/${article_id}/comments`;
    api.getData(endpoint, params).then(({ comments }) => {
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
    const endpoint = `comments/${comment_id}`;
    api.removeData(endpoint).then(data => {
      this.setState({ isDeleted: true });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newComment !== this.props.newComment) {
      this.fetchData();
    } else if (
      prevState.selectedParams.sort_by !== this.state.selectedParams.sort_by ||
      prevState.selectedParams.order !== this.state.selectedParams.order
    ) {
      this.sortData();
    } else if (prevState.isDeleted !== this.state.isDeleted) {
      this.fetchData();
      this.setState({ isDeleted: false });
    } else if (
      prevProps.page !== this.props.page &&
      this.props.page - prevProps.page === 1
    ) {
      this.fetchMoreData();
    }
  }
  commentSort = selectedParams => {
    this.setState({ selectedParams });
  };

  render() {
    const { comments, isLoading, selectedParams } = this.state;
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
              user={this.props.user}
              deleteComment={this.deleteComment}
            />
          );
        })}
      </div>
    ) : (
      <h2 className="article-comment-list">Loading...</h2>
    );
  }
}
