const express = require('express');
const router = express.Router();

const Person = require('../Controller/Person');
const Movie = require('../Controller/Movie'); 
const Image = require('../Controller/Image'); 
const fs = require('fs');

router.get('/:id', async (req,res) => {
    try
    {
        let p = await Person.name(req.params.id);
        let m = await Movie.getByActor(req.params.id);
        let r = {};
        r.info = p;
        r.movies = m;
        res.status(200).json(r);
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
});

router.post('/:id',async(req,res)=>
{
    try{
        
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});


module.exports = router;