import React, { Component } from "react";

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
        <h1 className="article-body-box-title">{title}</h1>
        <h3 className="article-body-box-topic">NC/{topic}</h3>
        <h4 className="article-body-box-post-info">
          Posted by {author} on {new Date(created_at).toString().slice(0, 24)}
        </h4>
        <p className="article-body-body">{body}</p>
        <p className="article-body-box-count-area">
          Comments: {comment_count} Votes: {votes}
        </p>
        <div className="article-body-box-votes">
          <button>Upvote</button> || <button>Downvote</button>
        </div>
      </div>
    );
  }
}
