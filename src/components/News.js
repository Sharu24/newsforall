import React, { Component } from "react";

import Loading from "./Loading";
import Article from "./Article";

class News extends Component {
  getArticle = article => {
    this.props.getArticle(article);
  };
  render() {
    const { loading, news } = this.props;
    if (loading || !news) {
      return <Loading />;
    } else {
      const articles = news.articles;
      return (
        <div className="container grid-2">
          {articles.map((article, index) => (
            <Article
              key={index}
              article={article}
              getArticle={this.getArticle}
            />
          ))}
        </div>
      );
    }
  }
}
export default News;
