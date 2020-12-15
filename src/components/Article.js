import React, { Component } from "react";

class Article extends Component {
  onClick = () => {
    this.props.getArticle(this.props.article);
  };
  render() {
    const article = this.props.article;
    return (
      <div className="container card grid-14" onClick={this.onClick}>
        <div className="banner">
          <div className="banner__image-container">
            <img className="banner__image" src={article.urlToImage} alt="" />
          </div>
        </div>
        <div>
          <p>{article.title} </p>
          <p
            className="py text-right"
            style={{ fontSize: "0.8rem", fontStyle: "oblique" }}
          >
            publishedAt : {article.publishedAt}
          </p>
        </div>
      </div>
    );
  }
}

export default Article;
