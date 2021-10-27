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
  };

  getMovies = (searchedPhraze, filterType = "") => {
    if (searchedPhraze) {
      this.setState({ searchedPhraze: searchedPhraze });

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
          })
        );
    }
  };

  render() {
    const isMoviesNotFound = !!this.state.movies;
    const isEmptyMovies = isMoviesNotFound ? !this.state.movies.length : true;
    const isEmptySearchField = !this.state.searchedPhraze;
    const moviesFound = isMoviesNotFound && !isEmptyMovies;
    const isLoading = isMoviesNotFound && isEmptyMovies && !isEmptySearchField;

    return (
      <main className="content">
        <div className="container">
          <Search
            moviesNotFound={this.state.moviesNotFound}
            getMovies={this.getMovies}
          />
          {isEmptySearchField ? (
            <div className="content__text">
              Чтобы найти фильм, забейте его название в поиск
            </div>
          ) : isLoading ? (
            <Preloader />
          ) : moviesFound ? (
            <Cards movies={this.state.movies} />
          ) : (
            <div className="content__text">Ничего не найдено...</div>
          )}
        </div>
      </main>
    );
  }
}
