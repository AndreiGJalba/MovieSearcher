import "./App.css";
import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList/index";
import listStyle from "./MovieList.module.css";
import style from "./components/Navbar/style.module.css";
import AddFavouriteComponent from "./components/AddFavourites";
import RemoveFavouritesComponent from "./components/RemoveFavourites";
import Circle from "./components/LoadingCircle";

function App() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=a10731254fe62c807714868d8c60e2ff&page=${page}`;
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=a10731254fe62c807714868d8c60e2ff&query=${query}&page=${page}`;

  const fetchMovies = async (api) => {
    setLoading(true);
    await fetch(api)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setMovies(data.results);
        setLoading(false);

        setTotalPages(data.total_pages);
      })
      .catch((err) => {
        console.log("something went wrong during the fetch...", err);
      });
  };
  const showMoreItems = () => {
    window.scrollTo(0, 0);
    // setVisible((prevValue) => prevValue + 6);
    if (movies && page < totalPages && query.replace(/ /g, "").length !== 0) {
      setPage(page + 1);
      fetchMovies(API_SEARCH);
    }
    if (movies && page < totalPages && query.replace(/ /g, "").length === 0) {
      setPage(page + 1);
      fetchMovies(API_URL);
    }
  };
  const showLessItems = () => {
    window.scrollTo(0, 0);
    // setVisible((prevValue) => prevValue + 6);
    if (movies && page !== 1 && query.replace(/ /g, "").length !== 0) {
      setPage(page - 1);
      fetchMovies(API_SEARCH);
    }
    if (movies && page !== 1 && query.replace(/ /g, "").length === 0) {
      setPage(page - 1);
      fetchMovies(API_URL);
    }
  };
  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("search");
    if (query.replace(/ /g, "").length !== 0) {
      try {
        const url = API_SEARCH;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setMovies(data.results);
      } catch (e) {
        console.log(e);
      }
    }
    if (query.replace(/ /g, "").length === 0) {
      fetchMovies(API_URL);
    }
  };
  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  const addFavourite = (movie) => {
    const newFavList = [...favourites, movie];
    if (favourites.includes(movie) === false) {
      setFavourites(newFavList);
      console.log(favourites);
    }
  };
  const removeFavourite = (movie) => {
    const newFavList = favourites.filter(
      (favourites) => favourites.id !== movie.id
    );
    setFavourites(newFavList);
    console.log(favourites);
  };
  console.log(loading);

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);
  return (
    <section>
      <h1>Movie App</h1>
      {/* Navbar */}
      <form className={style.navForm} onSubmit={searchMovie}>
        <input
          type="search"
          placeholder="Search.."
          value={query}
          name="query"
          // disabled={disable}
          onChange={changeHandler}
        />
      </form>
      <div className={style.topnav}>
        <button
          className={style.btn}
          onClick={() => {
            setCategory(true);
          }}
        >
          Movies
        </button>
        <button
          className={style.btn}
          onClick={() => {
            setCategory(false);
          }}
        >
          Favourites
        </button>
      </div>
      {/* //////////// */}

      {/* Movie List Component */}
      <div className={listStyle.main}>
        {category && (
          <>
            {movies.length > 0 ? (
              <>
                <h1>Movies</h1>
                <div className={listStyle.mainList}>
                  <MovieList
                    array={movies}
                    Component={AddFavouriteComponent}
                    handleFavorite={addFavourite}
                  />
                </div>
                <div className={listStyle.btnFlex}>
                  <button
                    className={listStyle.btn}
                    onClick={() => showLessItems()}
                  >
                    Previous page
                  </button>
                  {loading && <Circle />}
                  <button
                    className={listStyle.btn}
                    onClick={() => showMoreItems()}
                  >
                    Next Page
                  </button>
                </div>
              </>
            ) : (
              <h1>Sorry, the searched movie doesn't exist...</h1>
            )}
          </>
        )}
        {!category && (
          <>
            {movies.length > 0 ? (
              <>
                <h1>Favourites</h1>
                <div className={listStyle.mainList}>
                  <MovieList
                    array={favourites}
                    Component={RemoveFavouritesComponent}
                    handleFavorite={removeFavourite}
                  />
                </div>
              </>
            ) : (
              <h1>Sorry, the searched movie doesn't exist...</h1>
            )}
          </>
        )}
      </div>
      {/* ///////// */}
    </section>
  );
}

export default App;
