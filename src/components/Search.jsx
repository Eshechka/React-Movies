import React from "react";

export class Search extends React.Component {
  state = {
    showMovie: "",
    searchingMovie: "",
    checkedFilter: "",
    searchSubmit: false,
  };

  handleChangeSearch = (event) => {
    this.setState({ searchingMovie: event.target.value, searchSubmit: false });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ searchSubmit: true });

    if (this.state.searchingMovie) {
      this.setState({ showMovie: this.state.searchingMovie });
    }

    if (this.state.searchingMovie) {
      this.props.getMovies(this.state.searchingMovie, this.state.checkedFilter);
    }
  };
  handleChangeFilter = (event) => {
    this.setState({ checkedFilter: event.target.value });

    if (this.state.searchingMovie) {
      this.props.getMovies(this.state.searchingMovie, event.target.value);
    } else if (this.state.showMovie) {
      this.props.getMovies(this.state.showMovie, event.target.value);
    }
  };

  render() {
    const disableFilter =
      !(this.state.showMovie || this.state.searchingMovie) ||
      this.props.moviesNotFound;
    return (
      <form className="col s12" onSubmit={this.handleSubmit}>
        <div className="row">
          <h4 style={{ height: "50px" }}>
            {this.state.showMovie
              ? `Результат поиска для ${this.state.showMovie}`
              : ``}
          </h4>
        </div>
        <div className="row">
          <div className="input-field col s12 search">
            <input
              placeholder="search..."
              type="text"
              className="validate"
              value={this.state.searchingMovie}
              onChange={this.handleChangeSearch}
            />
            <span className="validate__warning">
              {this.state.searchSubmit && !this.state.searchingMovie
                ? "введите название для поиска"
                : ""}
            </span>
            <button
              className="btn waves-effect waves-light search__btn"
              type="submit"
              name="action"
            >
              Search
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
        <div className="row filter green lighten-5">
          <p>
            <label>
              <input
                className="with-gap filter__input"
                name="filterType"
                type="radio"
                value=""
                onChange={this.handleChangeFilter}
                checked={"" === this.state.checkedFilter}
                disabled={disableFilter}
              />
              <span>All</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="with-gap filter__input"
                name="filterType"
                value="movie"
                type="radio"
                onChange={this.handleChangeFilter}
                checked={"movie" === this.state.checkedFilter}
                disabled={disableFilter}
              />
              <span>Movies</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="with-gap filter__input"
                name="filterType"
                value="episode"
                type="radio"
                onChange={this.handleChangeFilter}
                checked={"episode" === this.state.checkedFilter}
                disabled={disableFilter}
              />
              <span>Episodes</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="with-gap filter__input"
                name="filterType"
                value="series"
                type="radio"
                onChange={this.handleChangeFilter}
                checked={"series" === this.state.checkedFilter}
                disabled={disableFilter}
              />
              <span>Series</span>
            </label>
          </p>
        </div>
      </form>
    );
  }
}
