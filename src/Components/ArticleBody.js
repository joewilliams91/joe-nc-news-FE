import React, { Component } from "react";
import { Link } from "@reach/router";

export default class ArticleBody extends Component {
  render() {
    const {
      author,
      article_id,
      title,
      topic,
      body,
      created_at,
      votes,
      comment_count
    } = this.props.article;
    return (
      <div className="article-body-box" key={article_id}>
        <div className="article-body-header">
          <div className="article-body-box-title">
            <h1>{title}</h1>
          </div>
          <Link to={`/topics/${topic}`} className="article-body-box-topic">
            <h3>NC/{topic}</h3>
          </Link>
        </div>
        <div className="article-body-box-post-info">
          <h4>
            Posted by {author} on {new Date(created_at).toString().slice(0, 24)}
          </h4>
        </div>

        <div className="article-body-body">
          <p id="article-body-body-text">{body}</p>
        </div>
        <div className="article-body-box-footer">
          <div className="article-body-box-count-area">
            <p>
              Comments: {comment_count} Votes: {votes}
            </p>
          </div>

          <div className="article-body-box-votes">
            <button>Upvote</button> || <button>Downvote</button>
          </div>
        </div>
      </div>
    );
  }
}
