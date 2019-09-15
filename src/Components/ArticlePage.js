import React from "react";
import * as api from "./api";
import ArticleBody from "./ArticleBody";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

class ArticlePage extends React.Component {
  state = {
    article: {},
    newComment: {},
    page: 1
  };

  fetchData = () => {
    const { article_id } = this.props;
    const endpoint = `articles/${article_id}`;
    api.getData(endpoint).then(({ article }) => {
      this.setState({
        article,
        page: 1
      });
    });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.newComment !== this.state.newComment) {
      this.fetchData();
    }
  }

  postNewComment = body => {
    const { article_id } = this.props;
    const newComment = { username: "tickle122", body };
    const endpoint = `articles/${article_id}/comments`;
    api.addData(endpoint, newComment).then(({ comment }) => {
      this.setState({ newComment: comment });
    });
  };

  nextPage = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  render() {
    const { article, newComment, page } = this.state;
    const { article_id } = this.props;
    return (
      <div className="thread-container">
        <div className="thread-column">
          <ArticleBody article={article} newComment={newComment} />
          <CommentBox postNewComment={this.postNewComment} />
          <CommentList
            article_id={article_id}
            newComment={newComment}
            page={page}
          />
        </div>
        <div className="article-page-footer">
          {page * 10 < +article.comment_count ? (
            <button onClick={this.nextPage} id="load-more-comments-button">
              Load More
            </button>
          ) : (
            <p>No more comments!</p>
          )}
        </div>
      </div>
    );
  }
}

export default ArticlePage;
