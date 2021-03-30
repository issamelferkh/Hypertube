import React, { useContext } from "react";
import "./Filter.css";
import Slider from "rc-slider";
import { GlobalContext } from "../../context/GlobalContext";
import SearchContext from '../../context/SearchContext'

const Filter = ({ sorting, ratings, years, genre }) => {

  const ratingsList = [
    '9',
    '8',
    '7',
    '6',
    '5'
  ]

  const yearList = [
    '1900'	,
    '1910'	,
    '1920'	,
    '1930'	,
    '1940'	,
    '1950'	,
    '1960'	,
    '1970'	,
    '1980'	,
    '1990'	,
    '2000'	,
    '2010'	,
    '2020'	
  ] 

  const genreList = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Thriller',
    'War',
    'Western'
  ]

  const searchTerms = useContext(SearchContext);

  const handleYearChanges = e => {
    if(e.target.value !== "All") {
      years([e.target.value, 2021]);
    } else {
      years([1900, 2021]);
    }
  };

  const handleGenreChanges = e => {
    if (e.target.value !== "All")
    {
      genre(e.target.value.toLowerCase());
    } else {
      genre("All");
    }
  };

  const handleRatingChanges = e => {
    if (e.target.value !== "All")
    {
      ratings([e.target.value,10]);
    } else {
      ratings("All");
    }
  };

  const handleSortingChanges = e => {
    if (e.target.value !== "All")
    {
      sorting(e.target.value);
    } else {
      sorting("All");
    }   
  };

  return (
    <GlobalContext.Consumer>
      {context => {
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
            <div className="RatingRange">
              <label>Rating</label><br/>
              <select
                className="browser-default"
                id="genreSelect"
                onChange={handleRatingChanges}
              >
                <option defaultValue="All">All</option>
                {ratingsList.map(ratings => (
                  <option key={ratings} 
                          value={ratings} 
                  >
                    {ratings}+
                  </option>
                ))}
              </select>
            </div>

            <div className="YearRange">
              <label>Year</label><br/>
              <select
                className="browser-default" id="genreSelect"
                onChange={handleYearChanges}
              >
                <option defaultValue="All">All</option>
                {yearList.map(year => (
                  <option key={year} 
                          value={year} 
                  >
                    {year} - 2021
                  </option>
                ))}
              </select>
            </div>

            <div className="RatingRange">
              <label>Genre</label><br/>
              <select
                className="browser-default"
                id="genreSelect"
                onChange={handleGenreChanges}
              >
                <option defaultValue="All">All</option>
                {genreList.map(genre => (
                  <option key={genre} 
                          value={genre} 
                  >
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="RatingRange">
              <label>Sort</label><br/>
              <select
                className="browser-default"
                id="genreSelect"
                onChange={handleSortingChanges}
              >
                <option defaultValue="All">None</option>
                <option value="title asc">A - Z</option>
                <option value="title desc">Z - A</option>
                <option value="year desc">Newest</option>
                <option value="year asc">Oldest</option>
                <option value="rating desc">Most Popular</option>
                <option value="rating asc">Least Popular</option>
              </select>
            </div>

          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Filter;
