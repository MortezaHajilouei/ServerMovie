
const Movie = require('../Models/Movie'); 
var sortJsonArray = require('sort-json-array');


async function list()
{
    let res = []
    res = await Movie.find().select('title rate detail cover');
    sortJsonArray(res, 'rate','des'); 
    return res;
}

async function add(movieItem)
{
    const m = new Movie({
        title:      movieItem.title,
        year:       movieItem.year,
        detail:     movieItem.detail,
        genre:      movieItem.genre,
        rate:       movieItem.rate,
        reviews:    movieItem.reviews,
        directors:  movieItem.directors,
        actors:     movieItem.actors,
        cover:      movieItem.cover
    });
    let newMovie = await m.save();
    return newMovie;
}

async function getByActor(ActorID){
    let movies = await  Movie.find({$or:[{ actors:ActorID} , {directors:ActorID}]});
    return movies;
}

async function get(id)
{
    let movie = await Movie.findOne({_id :id});
    return movie;
}

async function del(id){
    await Movie.deleteOne({_id:id});
}

async function update(id,result){
  
    let r = await Movie.findOneAndUpdate({_id:id},result);
    return r;
}

module.exports = {list,add,get,update,del,getByActor};