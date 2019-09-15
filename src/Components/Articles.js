import React from "react";
import * as api from "./api";
import Article from "./Article";
import { Link } from "@reach/router";
import ArticlesFilter from "./ArticlesFilter";

class Articles extends React.Component {
  state = {
    articles: [],
    total_count: 0,
    page: 1
  };

  fetchArticles = () => {
    const { topic_id } = this.props;
    const endpoint = topic_id
      ? `articles?topic=${topic_id}&sort_by=created_at`
      : `articles?sort_by=created_at`;
    api.getData(endpoint).then(({ articles, total_count }) => {
      this.setState({ articles, total_count, page: 1 });
    });
  };
  fetchMoreArticles = () => {
    const { topic_id } = this.props;
    const { page } = this.state;
    const endpoint = topic_id
      ? `articles?topic=${topic_id}&p=${page}&sort_by=created_at`
      : `articles?p=${page}&sort_by=created_at`;
    api.getData(endpoint).then(({ articles, total_count }) => {
      this.setState(currentState => {
        const newState = {
          ...currentState,
          articles: [...currentState.articles, ...articles],
          total_count
        };
        return newState;
      });
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic_id !== this.props.topic_id) {
      this.fetchArticles();
    } else if (
      prevState.page !== this.state.page &&
      this.state.page - prevState.page === 1
    ) {
      this.fetchMoreArticles();
    }
  }
  nextPage = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  render() {
    const { articles } = this.state;
    return (
      <div className="articles-container">
        <div className="articles-column">
          <ArticlesFilter />
          <div className="articles">
            {articles.map(article => {
              const { article_id } = article;
              return (
                <>
                  <Link className="link" to={`/article/${article_id}`}>
                    <Article article={article} key={article_id} />
                  </Link>
                </>
              );
            })}
          </div>
          <div className="footer-section">
            {this.state.articles.length !== +this.state.total_count ? (
              <button id="load-more-button" onClick={this.nextPage}>
                Load more
              </button>
            ) : (
              <p>No more articles!</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
