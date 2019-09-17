import React from "react";
import * as api from "./api";
import Article from "./Article";
import ArticlesFilter from "./ArticlesFilter";

class Articles extends React.Component {
  state = {
    articles: [],
    total_count: 0,
    page: 1,
    isLoading: true,
    selectedParams: {}
  };

  fetchArticles = () => {
    const { topic_id } = this.props;
    const params = { params: { topic: topic_id } };
    api.getArticles(params).then(({ articles, total_count }) => {
      this.setState({
        articles,
        total_count,
        selectedParams: {},
        page: 1,
        isLoading: false
      });
    });
  };

  sortArticles = () => {
    const { topic_id } = this.props;
    const { selectedParams } = this.state;
    const params = { params: { ...selectedParams, topic: topic_id } };
    api.getArticles(params).then(({ articles, total_count }) => {
      this.setState({
        articles,
        total_count,
        page: 1,
        isLoading: false
      });
    });
  };

  fetchMoreArticles = () => {
    const { topic_id } = this.props;
    const { page, selectedParams } = this.state;
    const params = { params: { ...selectedParams, topic: topic_id, p: page } };
    api.getArticles(params).then(({ articles, total_count }) => {
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
      prevState.selectedParams.sort_by !== this.state.selectedParams.sort_by ||
      prevState.selectedParams.order !== this.state.selectedParams.order
    ) {
      this.sortArticles();
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

  articleSort = selectedParams => {
    this.setState({ selectedParams });
  };

  render() {
    const { articles, isLoading, selectedParams } = this.state;
    const { user } = this.props;
    return (
      <div className="articles-container">
        <div className="articles-column">
          <ArticlesFilter
            articleSort={this.articleSort}
            selectedParams={selectedParams}
          />
          {isLoading === false ? (
            <div className="articles">
              {articles.map(article => {
                const { article_id } = article;
                return (
                  <>
                    <Article user={user} article={article} key={article_id} />
                  </>
                );
              })}
            </div>
          ) : (
            <h2 className="articles">Loading...</h2>
          )}
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
