import React, { useContext } from "react";
import "./Filter.css";
import Slider from "rc-slider";
import { GlobalContext } from "../../context/GlobalContext";
import SearchContext from '../../context/SearchContext'

const Filter = ({ ratings, years, genre }) => {

  const yearList = [
    '2021',
    '2020',
    '2019'
  ] 

  const genreList = [
    'All',
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

  const handleRatingChanges = value => {
    ratings(value);
  };

  const handleYearChanges = e => {
    if(e.target.value !== "Year") {
      years(e.target.value);
    } else {
      years([1900, 2021]);
    }
    // years(value);
  };

  const handleGenreChanges = e => {
    if (e.target.value !== "All")
    {
      genre(e.target.value.toLowerCase());
    } else {
      genre("All");
    }
  };

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

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
              <label>{lang.search[0].rating}</label>
              <Range
                min={0}
                max={10}
                allowCross={false}
                defaultValue={searchTerms.ratings}
                // defaultValue={searchTerms.ratings}
                onAfterChange={handleRatingChanges}
              />
            </div>
            {/* <div className="YearRange">
              <label>{lang.search[0].year}</label>
              <Range
                min={1915}
                max={2019}
                allowCross={true}
                defaultValue={searchTerms.years}
                onAfterChange={handleYearChanges}
              />
            </div> */}

            <select
              className="browser-default" id="genreSelect"
              onChange={handleYearChanges}
            >
              <option defaultValue="Year">Year</option>
              {yearList.map(year => (
                <option key={year} 
                        value={year} 
                >
                  {year}
                </option>
              ))}
            </select>

            <select className="browser-default"
                    id="genreSelect"
                    onChange={handleGenreChanges}
            >
              {genreList.map(genre => (
                <option key={genre} 
                        value={genre} 
                >
                  {genre}
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
