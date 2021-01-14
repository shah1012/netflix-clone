import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // snipped of code which runes based on specific condition

  useEffect(() => {
    // if [], run once when row loads and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request.data.results);
      //request.data.results
      return request;
    }
    fetchData();
  }, [fetchUrl]); //have to include the variable if your pulling it from somewhere else example "fetchUrl" its dependent

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    //passes in the movie
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=MXFCIvsOzkg
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err)); //catchs the error
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/*row poster ex: the elemnts   it makes all the objects fin in a row*/}
        {movies.map((movie) => (
          <img
            key={movie.id} //{/*specail key for each item*/}
            onClick={() => handleClick(movie)} //onclick event for the movie
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} //gives classname if isLargeRow == true
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} //if statement to check if its large then use backdrop part
            alt={movie.name}
          />
        ))}
      </div>
      {/* container -> posters*/}
      {/* Added movie trailer */}
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}{" "}
      {/*  gets the trailer url if we click on it */}
    </div>
  );
}

export default Row;
