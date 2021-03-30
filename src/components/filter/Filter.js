import React, { useContext } from "react";
import "./Filter.css";
import Slider from "rc-slider";
import { GlobalContext } from "../../context/GlobalContext";
import SearchContext from "../../context/SearchContext";

const Filter = ({ ratings, years, genre }) => {

  var yearList = [];
  yearList.push('All');
  var i = 2021;
  while(i >= 1900)
  {
    yearList.push(i);
    i--;
  } 
  const ratingsList = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];

  const genreList = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  const searchTerms = useContext(SearchContext);


  const handleYearChanges = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "All") {
      years([e.target.value.toLowerCase(), 2021]);
    } else {
      years("All");
    }
  };

  const handleRatingChanges = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "All") {
      ratings([e.target.value.toLowerCase(), 10]);
    } else {
      ratings("All");
    }
  };

  const handleGenreChanges = (e) => {
    if (e.target.value !== "All") {
      genre(e.target.value.toLowerCase());
    } else {
      genre("All");
    }
  };

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  return (
    <GlobalContext.Consumer>
      {(context) => {
        const locale = context.locale;
        var lang;
        switch (locale) {
          case "en":
            lang = require("../../locale/en");
            break;
          case "ar":
            lang = require("../../locale/ar");
            break;
          case "fr":
            lang = require("../../locale/fr");
            break;
          default:
            lang = require("../../locale/en");
        }
        return (
          <div className="all">





            <select
              className="browser-default"
              id="yearSelect"
              onChange={handleYearChanges}
            >
              {yearList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>




            <select
              className="browser-default"
              id="genreSelect"
              onChange={handleGenreChanges}
            >
              {genreList.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <select
              className="browser-default"
              id="ratingSelect"
              onChange={handleRatingChanges}
            >
              {ratingsList.map((ratings) => (
                <option key={ratings} value={ratings}>
                  {ratings}
                </option>
              ))}
            </select>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Filter;
