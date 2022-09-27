import React from "react";
import Style from "./style.module.css";

const MovieList = ({ handleFavorite, array, Component }) => {
  const API_IMAGE = "https://image.tmdb.org/t/p/w500/";
  const FavoriteComponent = Component;
  return (
    <>
      {array.map((item) => (
        <div className={Style.item} key={item.id}>
          <img src={API_IMAGE + item.poster_path} alt="" />
          <div className={Style.content}>
            <h1>{item.title}</h1>
            <p>{item.release_date}</p>
          </div>
          <div
            className={Style.favorite}
            onClick={() => {
              handleFavorite(item);
            }}
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
