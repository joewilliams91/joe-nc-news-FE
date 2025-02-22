import React from "react";
import ArticleBody from "./ArticleBody";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import ErrorHandler from "./ErrorHandler";

class ArticlePage extends React.Component {
  state = {
    newComment: {},
    deletedComment: null,
    err: null,
    commentCount: ""
  };

  newCommentAdder = newComment => {
    this.setState({ newComment });
  };
  commentDeleter = deletedComment => {
    this.setState({ deletedComment });
  };
  addError = err => {
    this.setState({ err });
  };
  getCommentCount = commentCount => {
    this.setState({ commentCount });
  };

  render() {
    const { newComment, deletedComment, err, commentCount } = this.state;
    const { article_id, user } = this.props;
    if (err) {
      return <ErrorHandler {...err} />;
    } else {
      return (
        <div className="thread-container">
          <div className="thread-column">
            <ArticleBody
              article_id={article_id}
              newComment={newComment}
              deletedComment={deletedComment}
              user={user}
              addError={this.addError}
              getCommentCount={this.getCommentCount}
            />
            <CommentBox
              article_id={article_id}
              newCommentAdder={this.newCommentAdder}
              postNewComment={this.postNewComment}
              user={user}
              addError={this.addError}
            />
            <CommentList
              newCommentAdder={this.newCommentAdder}
              article_id={article_id}
              newComment={newComment}
              user={user}
              commentDeleter={this.commentDeleter}
              commentCount={commentCount}
              addError={this.addError}
            />
          </div>
        </div>
      );
    }
  }
}

export default ArticlePage;
