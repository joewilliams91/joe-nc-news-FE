import React from "react";
import * as api from "./api";
import { Link } from "@reach/router";
import Icon from "./Icons";

class Article extends React.Component {
  state = {
    vote: 0,
    err: null
  };

  articleVote = inc_votes => {
    const { article_id } = this.props.article;
    const patch = { inc_votes };
    this.setState(currentState => {
      const newState = {
        ...currentState,
        vote: currentState.vote + inc_votes
      };
      return newState;
    });
    api.patchArticle(article_id, patch).catch(err => {
      this.setState({ err });
    });
  };

  componentDidMount() {
    this.setState({ vote: 0 });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.username !== this.props.user.username) {
      this.setState({ hasVoted: false });
    } else if (prevProps.article.votes !== this.props.article.votes) {
      this.setState({ vote: 0 });
    }
  }

  render() {
    const { user } = this.props;
    const {
      author,
      title,
      article_id,
      topic,
      created_at,
      comment_count,
      votes
    } = this.props.article;
    const { vote } = this.state;
    return (
      <div className="article-box" key={article_id}>
        <div className="article-box-header">
          <div className="article-icon">
            <Icon icon={topic} />
          </div>
          <Link className="article-box-title" to={`/article/${article_id}`}>
            <h2 className="link">{title}</h2>
          </Link>
          <div className="article-box-topic">
            <h3 className="article-box-topic-text">NC/{topic}</h3>
          </div>
        </div>
        <div className="article-box-content">
          <div className="article-box-post-info">
            <h4 className="article-box-author">
              Posted by {author} on{" "}
              {new Date(created_at).toString().slice(0, 24)}
            </h4>
            <p className="article-box-count-area">
              Comments: {comment_count} Votes: {votes + vote}
            </p>
          </div>
          <div className="article-box-votes">
            <button
              onClick={
                vote < 1 && user.username
                  ? () => {
                      this.articleVote(1);
                    }
                  : null
              }
              className="vote-button"
            >
              <Icon icon="up" />
            </button>

            <button
              onClick={
                vote > -1 && user.username
                  ? () => {
                      this.articleVote(-1);
                    }
                  : null
              }
              className="vote-button"
            >
              <Icon icon="down" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
