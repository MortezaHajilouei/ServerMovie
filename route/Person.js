const express = require('express');
const router = express.Router();

const Person = require('../Controller/Person');

router.delete('/:id', async (req,res) =>{
    try {
        var r = await Person.del(req.params.id);
        res.status(200).json(r);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.get('/',async (req,res) => {
    try {
        let r = await Person.GetAll(req.query.type);
        res.status(200).json(r);
    } catch (error) {
        res.status(500).json({message:err.message});
    }
});

router.get('/:id', async (req,res) => {
    try
    {
        let p = await Person.GetInfo(req.params.id);
        res.status(200).json(p);
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>
{
    try{
        let r;
        if(req.body.actors != undefined)
            r = await Person.add(req.body.actors,"Actor");
        if(req.body.directors != undefined)
            r = await Person.add(req.body.directors,"Director");
        res.status(200).json(r);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});


module.exports = router;