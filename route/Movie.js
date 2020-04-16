const express = require('express');
const router = express.Router();

const Person = require('../Controller/Person');
const Movie = require('../Controller/Movie'); 
const Image = require('../Controller/Image'); 

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
            movie.directors = await Person.names(movie.directors);
            movie.actors = await Person.names(movie.actors);
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
            let result={};
            if(req.body.directors != undefined)
            {
                let tempDir = await Person.add(req.body.directors,"Director");
                result.directors = tempDir ;
            }
            if(req.body.actors != undefined)
            {
                let tempAct = await Person.add(req.body.actors,"Actor");
                result.actors = tempAct;
            }
            if(req.body.reviews != undefined)
            {
                if(result.reviews != undefined)
                    result.reviews.add(req.body.reviews);
                else
                    result.reviews = req.body.reviews;
            }
            if(req.body.rate != undefined)
                result.rate = req.body.rate;
            if(req.body.year != undefined)
                result.year= req.body.year;
            if(req.body.cover != undefined)
            {
                result.cover = req.body.cover;
                if(found.cover != undefined && found.cover._id != result.cover._id)
                    Image.del(found.cover._id)
            }
    
            let rr2 = await Movie.update(req.params.id,result);
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
        if(req.body.actors != undefined)
            req.body.actors = await Person.add(req.body.actors,"Actor");
        if(req.body.directors != undefined)
            req.body.directors = await Person.add(req.body.directors,"Director");

        var result = await Movie.add(req.body);
        res.status(201).json(result);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});



module.exports = router;