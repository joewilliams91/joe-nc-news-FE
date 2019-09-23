import React from "react";
import { Link } from "@reach/router";
import Icon from "./Icons";
import Voter from "./Voter.js";

class Article extends React.Component {
  state = {
    vote: 0,
    err: null
  };

  voteChange = inc_votes => {
    this.setState(currentState => {
      const newState = {
        ...currentState,
        vote: currentState.vote + inc_votes
      };
      return newState;
    });
  };

  componentDidMount() {
    this.setState({ vote: 0 });
  }

  render() {
    const { username } = this.props.user;
    const { addError } = this.props;
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
          {username === author && (
            <div className="delete-article-area">
              {" "}
              <button
                className="delete-article-area-button"
                onClick={() => this.props.deleteArticle(article_id)}
              >
                <Icon icon="delete" />
              </button>
            </div>
          )}
          <Voter
            username={username}
            vote={vote}
            voteChange={this.voteChange}
            name="article-voter"
            article_id={article_id}
            addError={addError}
          />
        </div>
      </div>
    );
  }
}

export default Article;
