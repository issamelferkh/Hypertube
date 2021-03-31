const axios = require("axios");
const MovieSchema = require("../schemas/Movie");

async function connectDB() {
  const mongoose = require("mongoose");
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  await mongoose.connect(
    "mongodb+srv://hypertube_user:hypertube_pwd@cluster0.jl0fx.mongodb.net/hypertube_db?retryWrites=true&w=majority",
    {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  console.log("--- Removing Existing Movies ---");
  await mongoose.connection.dropCollection("movies");

  console.log("--- Create New Movies Collection ---");
  await mongoose.connection.createCollection("movies");
}

const scrapYTS = async () => {
  const raw = [];
  for (let i = 1; i <= 583; i++) {
    const res = await axios.get(
      // `https://yts.lt/api/v2/list_movies.json?limit=50&page=${i}`
      `https://yts.mx/api/v2/list_movies.json?limit=50&page=${i}`
    );
    if (!res.data.data.movies) break;
      console.log(`-> YTS ${res.data.data.movies.length} movie(s) found on page ${i}.`);
    raw.push(...res.data.data.movies);
  }

  const formated = raw.map(movie => {
    const torrents = [];
    for (const item in movie.torrents) {
      const torrent = {
        magnet: movie.torrents[item].url,
        quality: movie.torrents[item].quality,
        language: "en",
        seed: movie.torrents[item].seeds,
        peer: movie.torrents[item].peers,
        bytes: movie.torrents[item].size_bytes,
        fileSize: movie.torrents[item].size,
        source: "YTS"
      };
      torrents.push(torrent);
    }
    const infos = {
      imdbId: movie.imdb_code,
      title: movie.title,
      year: movie.year,
      plot: movie.synopsis,
      runtime: movie.runtime,
      genres: movie.genres
        ? movie.genres.map(genre => genre.toLowerCase())
        : null,
      trailer: movie.yt_trailer_code
        ? `http://youtube.com/watch?v=${movie.yt_trailer_code}`
        : null,
      poster: movie.large_cover_image,
      rating: movie.rating,
      torrents: torrents
    };
    return infos;
  });
  return formated;
};

const scrapPopcorn = async () => {
  const raw = [];
  for (let i = 1; i <= 271; i++) {
    try {
      const res = await axios.get(
        `http://api.pctapi.com/list`
      );
      console.log(`-> POPCORN ${res.data.MovieList.length} movie(s) found on page ${i}.`);
      raw.push(...(res.data.MovieList));
    } catch (err) {
      console.log("aaa"+err.message);
      continue;
    }
  }

  const formated = raw.map(movie => {
    const torrents = [];

    for (const language in movie.torrents) {
      for (const quality in movie.torrents[language]) {
        const torrent = {
          magnet: movie.torrents[language][quality].url,
          quality: quality,
          language: language,
          seed: movie.torrents[language][quality].seed,
          peer: movie.torrents[language][quality].peer,
          bytes: movie.torrents[language][quality].size,
          fileSize: movie.torrents[language][quality].filesize,
          source: "Popcorn Time"
        };
        torrents.push(torrent);
      }
    }

    const infos = {
      imdbId: movie.imdb_id,
      title: movie.title,
      year: movie.year,
      plot: movie.synopsis,
      runtime: parseInt(movie.runtime),
      trailer: movie.trailer,
      poster: movie.poster_big,
      genres: movie.genres
        ? movie.genres.map(genre => genre.toLowerCase())
        : null,
      rating: movie.rating.percentage / 10,
      torrents: torrents
    };

    return infos;
  });
  return formated;
};

const Scrap = async () => {
  try {
    await connectDB();
    const ytsRes = await scrapYTS();
    const popcornRes = await scrapPopcorn();

    const completeRawResult = ytsRes.concat(popcornRes);
    // console.log(completeRawResult);
    
    const filteredResults = [];
    completeRawResult.map(movie => {
      for (i = 0; i < filteredResults.length; i++) {
        if (!movie.imdbId) return null;
        if (filteredResults[i].imdbId === movie.imdbId) {
          filteredResults[i].torrents = [
            ...movie.torrents,
            ...filteredResults[i].torrents
          ];
          return null;
        }
      }
      filteredResults.push(movie);
    });

    console.log("--- Removing Duplicates Movies ---");

    for (i = 0; i < completeRawResult.length; i++) {
      for (j = 0; j < completeRawResult.length; j++) {
        if (completeRawResult[i].imdbId === completeRawResult[j].imdbId) {
          if (
            completeRawResult[i].torrents.length >
            completeRawResult[j].torrents.length
          ) {
            completeRawResult.splice(j, 1);
          }
        }
      }
    }

    console.log("--- Removing Movies Without Poster ---");

    var movieList = completeRawResult;
    for (var a = 0; a < movieList.length; a++) {
      if (movieList[a].poster === "N/A") {
        movieList.splice(a, 1);
        a--;
        break;
      }
    }

    console.log("--- Pushing To DataBase ---");
    await MovieSchema.collection.insertMany(movieList);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
};

module.exports = Scrap;