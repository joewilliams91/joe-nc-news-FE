import React, { Component } from "react";
import * as api from "./api";
import Comment from "./Comment";

export default class CommentList extends Component {
  state = {
    comments: []
  };

  fetchData = () => {
    const { article_id } = this.props;
    const endpoint = `articles/${article_id}/comments?sort_by=created_at`;
    api.getData(endpoint).then(({ comments }) => {
      this.setState({ comments });
    });
  };

  fetchMoreData = () => {
    const { article_id, page } = this.props;
    const endpoint = `articles/${article_id}/comments?p=${page}&sort_by=created_at`;
    api.getData(endpoint).then(({ comments }) => {
      this.setState(
        currentState => {
          const newState = {
            ...currentState,
            comments: [...currentState.comments, ...comments]
          };
          return newState;
        }
      );
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newComment !== this.props.newComment) {
      this.fetchData();
    } else if (
      prevProps.page !== this.props.page &&
      this.props.page - prevProps.page === 1
    ) {
      this.fetchMoreData();
    }
  }

  render() {
    const { comments } = this.state;
    return (
      <div className="article-comment-list">
        {comments.map(comment => {
          return <Comment comment={comment} key={comment.comment_id} />;
        })}
      </div>
    );
  }
}
