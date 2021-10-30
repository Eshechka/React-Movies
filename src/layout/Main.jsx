import React from "react";
import { Cards } from "../components/Cards.jsx";
import { Preloader } from "../components/Preloader.jsx";
import { Search } from "../components/Search.jsx";

const API_KEY = process.env.REACT_APP_API_KEY;

export class Main extends React.Component {
  state = {
    movies: [],
    searchedPhraze: "",
    moviesNotFound: false,
    isLoading: false,
  };

  getMovies = (searchedPhraze, filterType = "") => {
    if (searchedPhraze) {
      this.setState({ searchedPhraze: searchedPhraze, isLoading: true });

      fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedPhraze}${
          filterType ? `&type=${filterType}` : ""
        }`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            movies: data.Search,
            moviesNotFound: !filterType
              ? !data.Search
              : this.state.moviesNotFound,
            isLoading: false,
          })
        )
        .catch((err) => {
          console.warn(err);
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  render() {
    const { isLoading, searchedPhraze } = this.state;
    return (
      <main className="content">
        <div className="container">
          <div className="container__preloader">
            {isLoading ? <Preloader /> : ""}
          </div>
          <Search
            moviesNotFound={this.state.moviesNotFound}
            getMovies={this.getMovies}
          />
          {!searchedPhraze ? (
            <div className="content__text">
              Чтобы найти фильм, забейте его название в поиск
            </div>
          ) : (
            <Cards movies={this.state.movies} />
          )}
        </div>
      </main>
    );
  }
}
