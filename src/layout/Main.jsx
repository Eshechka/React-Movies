import React from "react";
import { Cards } from "../components/Cards.jsx";
import { Preloader } from "../components/Preloader.jsx";
import { Search } from "../components/Search.jsx";

export class Main extends React.Component {
  state = {
    movies: [],
    searchedPhraze: "",
  };

  getMovies = (searchedPhraze, filterType = "") => {
    if (searchedPhraze) {
      this.setState({ searchedPhraze: searchedPhraze });

      fetch(
        `http://www.omdbapi.com/?apikey=f1f0ce8f&s=${searchedPhraze}&type=${filterType}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ movies: data.Search }));
    }
  };

  render() {
    return (
      <main className="content">
        <div className="container">
          <Search getMovies={this.getMovies} />
          {!!this.state.movies ? (
            this.state.movies.length ? (
              <Cards movies={this.state.movies} />
            ) : this.state.searchedPhraze ? (
              <Preloader />
            ) : (
              <div className="content__text">
                Чтобы найти фильм, забейте его название в поиск
              </div>
            )
          ) : (
            <div className="content__text">Ничего не найдено...</div>
          )}
        </div>
      </main>
    );
  }
}
