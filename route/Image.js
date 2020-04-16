const express = require('express');
const router = express.Router();

const Person = require('../Controller/Person');
const Movie = require('../Controller/Movie'); 
const Image = require('../Controller/Image'); 
const fs = require('fs');

router.get('/:id', async (req,res) => {
    try{
        let result = await Image.name(req.params.id);
        if(result.length != 0)
        {
            image = result[0];
            fs.exists(image.path, function(exists)
            {
                if (exists)
                {
                  res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + image.path
                  });
                  fs.createReadStream(image.path).pipe(res);
                } 
                else 
                {
                    res.status(400).json({message:"File does not exist"});
                }
              });
        }else{
            res.status(400).json({message:"File does not exist"});
        }
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
});

router.post('/:id',async(req,res)=>
{
    try{
        if(req.busboy != undefined)
        {
            var existNow = false;
            var fstream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename) {
                dir = __dirname + '/DB/';
                filePath = dir + req.params.id;
                if(fs.existsSync(filePath))
                {
                    existNow = true;
                    fs.unlinkSync(filePath);
                }
                fstream = fs.createWriteStream(filePath);
                file.pipe(fstream);
                fstream.on('close', async function ()
                {
                    try{
                        if(!existNow)
                        {
                            let rr = await Image.addOne({"path":filePath,"type":"jpg"});
                            let rr2;
                            if(fieldname == 'cover')
                                rr2 = await Movie.update(req.params.id,{cover:rr._id});
                            else
                                rr2 = await Person.update(req.params.id,{cover:rr._id});
                            res.status(201).json(rr2);
                        }
                        else{
                            res.status(201).end();
                        }
                    }
                    catch(err){
                        res.status(500).json({message:err});
                    }
                });
            });
        }
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});


module.exports = router;