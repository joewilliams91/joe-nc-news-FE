import React from "react";
import * as api from "./api";
import Article from "./Article";
import ArticlesFilter from "./ArticlesFilter";
import ErrorHandler from "./ErrorHandler";
import ArticleAdder from "./ArticleAdder";

class Articles extends React.Component {
  state = {
    articles: [],
    total_count: 0,
    page: 1,
    isLoading: true,
    selectedParams: {},
    err: null
  };

  fetchArticles = () => {
    const { topic_id } = this.props;
    const { page, selectedParams } = this.state;
    const params = {
      params: { ...selectedParams, topic: topic_id, p: page }
    };
    if (page === 1) {
      api
        .getArticles(params)
        .then(({ articles, total_count }) => {
          this.setState({
            articles,
            total_count,
            selectedParams: {},
            page: 1,
            isLoading: false,
            err: null
          });
        })
        .catch(({ response }) => {
          this.setState({ err: response });
        });
    } else {
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
    }
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
        isLoading: false,
        err: null
      });
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedParams.sort_by !== this.state.selectedParams.sort_by ||
      prevState.selectedParams.order !== this.state.selectedParams.order
    ) {
      this.sortArticles();
    } else if (
      prevProps.topic_id !== this.props.topic_id ||
      prevProps.user.username !== this.props.user.username ||
      (prevState.page !== this.state.page &&
        this.state.page - prevState.page === 1)
    ) {
      this.fetchArticles();
    }
  }
  
  nextPage = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  articleSort = selectedParams => {
    this.setState({ selectedParams });
  };

  newArticleAdder = newArticle => {
    this.setState(currentState => {
      const newArticles = [newArticle, ...currentState.articles];
      const newState = { ...currentState, articles: newArticles };
      return newState;
    });
  };

  deleteArticle = article_id => {
    this.setState(currentState => {
      const newArticles = currentState.articles.filter(
        article => article.article_id !== article_id
      );
      const newState = { ...currentState, articles: newArticles };
      return newState;
    });
    api.deleteArticle(article_id).catch(err => {
      this.setState({ err });
    });
  };

  render() {
    const { articles, isLoading, selectedParams, err, topics } = this.state;
    const { user } = this.props;
    if (err) {
      return <ErrorHandler {...err} />;
    } else {
      return (
        <div className="articles-container">
          <div className="articles-column">
            <ArticlesFilter
              topics={topics}
              articleSort={this.articleSort}
              selectedParams={selectedParams}
            />
            <ArticleAdder
              addArticle={this.AddArticle}
              user={user}
              topics={topics}
              newArticleAdder={this.newArticleAdder}
            />
            {isLoading === false ? (
              <div className="articles">
                {articles.map(article => {
                  const { article_id } = article;
                  return (
                    <>
                      <Article
                        user={user}
                        article={article}
                        key={article_id}
                        deleteArticle={this.deleteArticle}
                      />
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
                <p className="footer-message">No more articles!</p>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Articles;
