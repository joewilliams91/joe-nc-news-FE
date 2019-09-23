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

  componentDidMount() {
    this.fetchArticles(1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevState.page !== this.state.page) {
      this.fetchArticles(page);
    } else if (
      prevState.selectedParams.sort_by !== this.state.selectedParams.sort_by ||
      prevState.selectedParams.order !== this.state.selectedParams.order
    ) {
      this.fetchArticles(1);
    } else if (prevProps.topic_id !== this.props.topic_id) {
      this.fetchArticles(1, "topic");
    }
  }

  fetchArticles = (p, type) => {
    const { topic_id } = this.props;
    const { selectedParams } = this.state;
    const params = {
      params: type === "topic" ? {topic: topic_id, p } : { ...selectedParams, topic: topic_id, p }
    };
    if (p === 1) {
      api
        .getArticles(params)
        .then(({ articles, total_count }) => {
          window.scrollTo(0, 0);
          this.setState({
            articles,
            total_count,
            selectedParams: type === "topic" ? {} : selectedParams,
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

  nextPage = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
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

  addError = err => {
    this.setState({ err });
  };

  render() {
    const { articles, isLoading, selectedParams, err } = this.state;
    const { user, topics } = this.props;
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
              addError={this.addError}
            />
            <ArticleAdder
              addArticle={this.AddArticle}
              user={user}
              topics={topics}
              newArticleAdder={this.newArticleAdder}
              addError={this.addError}
            />
            {isLoading === false ? (
              <div className="articles">
                {articles.map(article => {
                  const { article_id } = article;
                  return (
                    <div key={article_id}>
                      <Article
                        user={user}
                        article={article}
                        deleteArticle={this.deleteArticle}
                        addError={this.addError}
                      />
                    </div>
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
