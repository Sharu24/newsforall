import React, { Component, Fragment } from "react";
import foundation from "../data/foundation";

class Filter extends Component {
  state = {
    clearFlag: false
  };

  onChange = evt => {
    console.log(evt.target.name, evt.target.value);
    this.props.handleFilters(evt.target.name, evt.target.value);
  };

  handleClear = async () => {
    await this.props.clearFilters();
    //this.setState({ clearFlag: !this.state.clearFlag });
  };

  render() {
    console.log("--- unable to tract ----", this.props.searchText);
    return (
      <Fragment>
        <div className="container grid-41" style={{ marginBottom: "1rem" }}>
          <input
            type="search"
            placeholder="Search for news"
            name="searchText"
            value={this.props.searchText}
            onChange={this.onChange}
          />
          <input type="button" value="Clear" onClick={this.handleClear} />
        </div>
        <div className="container grid-3" style={{ marginBottom: "3rem" }}>
          <select name="country" id="country" onChange={this.onChange}>
            <option value="" hidden="hidden">
              country
            </option>
            {Object.keys(foundation.country).map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select name="category" id="category" onChange={this.onChange}>
            <option value="" hidden="hidden">
              category
            </option>
            {foundation.category.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select name="sources" id="sources" onChange={this.onChange}>
            <option value="" hidden="hidden">
              Sources
            </option>
            {this.props.allSources &&
              this.props.allSources.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
      </Fragment>
    );
  }
}

export default Filter;
