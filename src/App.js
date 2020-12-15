import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import News from "./components/News";
import NewsArticle from "./components/NewsArticle";

import foundation from "./data/foundation";

// const API_KEY = "fd67aff3f3544eb6ab2f77e54d623f50";
const API_KEY = "943b489169d04cd1a8ff121a7db21568";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null,
      allSources: null,
      loading: false,
      article: null,
      searchText: "",
      country: "",
      category: "",
      sources: "",
      language: "",
      domains: "",
      from: "",
      to: "",
      sortBy: "",
      pageSize: 8
    };
  }

  buildApiUrl = picker => {
    const baseUrl = "https://newsapi.org/v2/";
    const headUrl = "https://newsapi.org/v2/top-headlines?1=1";
    const allUrl = "https://newsapi.org/v2/everything?1=1";
    const srcUrl = "https://newsapi.org/v2/sources?1=1";

    const API_URL = [
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${this.state.pageSize}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/top-headlines?country=${
        foundation.country[this.state.country]
      }&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/top-headlines?sources=${this.state.sources}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/top-headlines?country=${
        foundation.country[this.state.country]
      }&category=${this.state.category}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/top-headlines?q=${this.state.searchText}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/everything?q=${this.state.searchText}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/everything?q=${this.state.searchText}&from=${this.state.from}&sortBy=${this.state.sortBy}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/everything?q=${this.state.searchText}&from=${this.state.from}&to=${this.state.to}&sortBy=${this.state.sortBy}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/everything?domains=${this.state.domains}&apiKey=${API_KEY}`,
      `https://newsapi.org/v2/sources?apiKey=${API_KEY}`,
      `https://newsapi.org/v2/sources?language=${this.state.language}apiKey=${API_KEY}`,
      `https://newsapi.org/v2/sources?language=${this.state.language}&country=${
        foundation.country[this.state.country]
      }&apiKey=${API_KEY}`
    ];

    if (picker) return API_URL[picker];
    else if (this.state.searchText) return API_URL[5];
    else if (this.state.country && this.state.category) return API_URL[3];
    else if (this.state.sources) return API_URL[2];
    else if (this.state.country) return API_URL[1];
    else return API_URL[0];
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const resNews = await axios.get(this.buildApiUrl());
    const resSources = await axios.get(this.buildApiUrl(9));
    const sourceArray = await resSources.data.sources.map(src => src.id);
    this.setState({
      news: resNews.data,
      allSources: sourceArray,
      loading: false
    });
  }

  handleFilters = async (filterName, filterValue) => {
    this.setState({ loading: true });
    await this.setState({ [filterName]: filterValue });
    const url = await this.buildApiUrl();
    console.log(url);
    const res = await axios.get(url);
    this.setState({ news: res.data, loading: false });
  };

  clearFilters = async () => {
    console.log("CLEAR FILTERS ");
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        searchText: "",
        country: "",
        category: "",
        sources: "",
        loading: false
      });
    }, 200);
    const resNews = await axios.get(this.buildApiUrl(0));
    this.setState({
      news: resNews.data,
      loading: false
    });
  };

  getArticle = article => {
    this.setState({ article: "", loading: true });
    setTimeout(() => {
      this.setState({ article: article, loading: false });
    }, 200);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.article && <Redirect to="/article" />}
          <Navbar />
          <Filter
            handleFilters={this.handleFilters}
            clearFilters={this.clearFilters}
            searchText={this.searchText}
            allSources={this.state.allSources}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <News
                    loading={this.state.loading}
                    news={this.state.news}
                    getArticle={this.getArticle}
                  />
                </Fragment>
              )}
            />
            <Route
              exact
              path="/article"
              render={() => (
                <NewsArticle
                  loading={this.state.loading}
                  article={this.state.article}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
