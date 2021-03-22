const express = require('express');
const searchController = require('../controllers/searchController');

exports.router = (() => {
    let searchRouter = express.Router();
  
    searchRouter.route("/movies").post(async (req, res) => searchController.search(req, res));
    searchRouter.route("/singleMovie").post(async (req, res) => searchController.searchSingle(req, res));
  
    return searchRouter;
  })();