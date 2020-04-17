const express = require('express');
const router = express.Router();

const Movie = require('../Controller/Movie'); 

router.get('/', async (req,res) => {
    try{
        const movie = await Movie.list();
        res.json(movie)
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }    
});

router.delete('/:id', async (req,res) =>{
    try {
        Movie.del(req.params.id);
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
});

router.get('/:id', async (req,res) => {
    try{
        let movie = await Movie.get(req.params.id);
        if(movie != null)
        {
            //movie.directors = await Person.names(movie.directors);
            //movie.actors = await Person.names(movie.actors);
            res.status(200).json(movie);
        }
        else
        {
            res.status(404).json({});
        }
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
});

router.put('/:id',async (req,res)=>
{
    try
    {
        let found = await Movie.get(req.params.id);
        if(found != null)
        {
            let rr2 = await Movie.update(req.params.id,req.body);
            res.status(201).json(rr2);
        }
        else
        {
            res.status(404).json({});
        }
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>
{
    try{
        var result = await Movie.add(req.body);
        res.status(201).json(result);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});



module.exports = router;