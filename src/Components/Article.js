import React from "react";

class Article extends React.Component {
  state = {};

  render() {
    const {
      author,
      title,
      article_id,
      topic,
      created_at,
      votes,
      comment_count
    } = this.props.article;
    return (
      <div className="article-box" key={article_id}>
        <h2 className="article-box-title">{title}</h2>
        <h3 className="article-box-topic">NC/{topic}</h3>
        <h4 className="article-box-post-info">
          Posted by {author} on {new Date(created_at).toString().slice(0, 24)}
        </h4>
        <p className="article-box-count-area">
          Comments: {comment_count} Votes: {votes}
        </p>
        <div className="article-box-votes">
          <button className="button">Upvote</button> || <button>Downvote</button>
        </div>
      </div>
    );
  }
}

export default Article;
