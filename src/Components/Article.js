import React from "react";
import * as api from "./api";
import { Link } from "@reach/router";

class Article extends React.Component {
  state = {
    hasVoted: false,
    votes: 0
  };

  articleVote = event => {
    event.preventDefault();
    const { article_id } = this.props.article;
    const inc_votes = +event.target.value;
    const patch = { inc_votes };
    api.patchArticle(article_id, patch).then(data => {
      this.setState(currentState => {
        const newState = {
          ...currentState,
          hasVoted: true,
          votes: currentState.votes + inc_votes
        };
        return newState;
      });
    });
  };

  componentDidMount() {
    const { votes } = this.props.article;
    this.setState({ votes });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.username !== this.props.user.username) {
      this.setState({ hasVoted: false });
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
      comment_count
    } = this.props.article;
    const { hasVoted, votes } = this.state;
    return (
      <div className="article-box" key={article_id}>
        <Link className="link" to={`/article/${article_id}`}>
          <h2 className="article-box-title">{title}</h2>
        </Link>
        <h3 className="article-box-topic">NC/{topic}</h3>
        <h4 className="article-box-post-info">
          Posted by {author} on {new Date(created_at).toString().slice(0, 24)}
        </h4>
        <p className="article-box-count-area">
          Comments: {comment_count} Votes: {votes}
        </p>
        <div className="article-box-votes">
          <button
            onClick={!hasVoted && user.username ? this.articleVote : null}
            className="button"
            value="1"
          >
            Upvote
          </button>{" "}
          ||{" "}
          <button
            onClick={!hasVoted && user.username ? this.articleVote : null}
            value="-1"
            className="button"
          >
            Downvote
          </button>
        </div>
      </div>
    );
  }
}

export default Article;
