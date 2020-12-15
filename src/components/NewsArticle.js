import React, { Fragment } from "react";
import Loading from "./Loading";
import { Link, Redirect } from "react-router-dom";

const navigateUrl = url => {
  const newWindow = window.open(url, "_blank", "noopener, noreferrer");
  if (newWindow) newWindow.opener = null;
};

function NewsArticle(props) {
  console.log("NewsArticle Props", props);
  const { loading, article } = props;
  if (loading) {
    return <Loading />;
  } else if (article === null) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
        <div className="container">
          <Link className="btn btn-dark py-2 my-1" to={{ pathname: "/" }}>
            Back
          </Link>
          <div
            className="card"
            onClick={() => {
              navigateUrl(article.url);
            }}
          >
            <h2 className="my-1 text-center">{article.title}</h2>
            <div className="container banner">
              <div class="banner__image-container">
                <img class="banner__image" src={article.urlToImage} />
              </div>
            </div>
            <div className="container banner my-1">
              <p>
                {article.author} | published at {article.publishedAt}
              </p>
              <h3 className="my-1">{article.description}</h3>
              <p className="my-1">{article.content}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NewsArticle;
