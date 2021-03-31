const MovieModel = require('../schemas/Movie');

const search = async (req, res) => {
    try {
        const { sorting, genre, ratings, years, page, limit, keywords } = req.body;      
        const sort = {};

        // if search -> result sortable with title
        if (keywords !== '' && !sorting) {
            sort['title'] = 1;
        }
        else if (sorting === 'title asc') {
            sort['title'] = 1;
        } else if (sorting === 'title desc') {
            sort['title'] = -1;
        } else if (sorting === 'year desc') {
            sort['year'] = -1;
        } else if (sorting === 'year asc' ) {
            sort['year'] = 1;
        } else if (sorting === 'rating desc' ) {
            sort['rating'] = -1;
        } else if (sorting === 'rating asc') {
            sort['rating'] = 1;
        } else { // if not search -> result sortable with most rating
            sort['rating'] = -1;
        }

        const skip = limit * (page - 1);
        const count = limit * page;
        const queryTerms = [
            { $match: {
                year: { $gte: parseInt(years[0]), $lte: parseInt(years[1]) },
                rating: { $gte: parseInt(ratings[0]), $lte: parseInt(ratings[1]) }
            }},
            { $sort: sort },
            { $limit: count },
            { $skip: skip },
        ]
        
        if (keywords !== '')
            queryTerms.unshift({ $match: { ...queryTerms.$match, title: { $regex: keywords, $options: "i"}}});
        if (genre !== 'All')
            queryTerms.unshift({ $match: { ...queryTerms.$match, genres: genre.toLowerCase()}});
            
        movieList = await MovieModel.aggregate(queryTerms);
        res.status(200).json(movieList);
        
    } catch (error) {
        console.log(error.message);
    }
}

const searchSingle = async (req, res) => {
    try {
        const imdbId = req.body;
        movie = await MovieModel.find({imdbId: imdbId.id});
        res.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    search,
    searchSingle
}