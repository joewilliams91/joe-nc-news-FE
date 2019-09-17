import React from "react";
import ArticleBody from "./ArticleBody";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

class ArticlePage extends React.Component {
  state = {
    newComment: {},
    deletedComment: null
  };

  newCommentAdder = newComment => {
    this.setState({ newComment });
  };
  commentDeleter = deletedComment => {
    this.setState({ deletedComment });
  };

  render() {
    const { newComment, deletedComment } = this.state;
    const { article_id, user } = this.props;
    return (
      <div className="thread-container">
        <div className="thread-column">
          <ArticleBody
            article_id={article_id}
            newComment={newComment}
            deletedComment={deletedComment}
            user={user}
          />
          <CommentBox
            article_id={article_id}
            newCommentAdder={this.newCommentAdder}
            postNewComment={this.postNewComment}
            user={user}
          />
          <CommentList
            newCommentAdder={this.newCommentAdder}
            article_id={article_id}
            newComment={newComment}
            user={user}
            commentDeleter={this.commentDeleter}
          />
        </div>
      </div>
    );
  }
}

export default ArticlePage;
