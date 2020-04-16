const express = require('express');
const router = express.Router();

const Image = require('../Controller/Image'); 

router.get('/' , async (req,res) =>{
    try {
        var rr = await Image.list();
        res.status(200).json(rr);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.delete('/:id', async (req,res) => {
    try {
        let r = await Image.del(req.params.id);
        res.status(200).json(r);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
});

router.get('/:id', async (req,res) => {
    try{
        let image = await Image.name(req.params.id);
        if(image != null)
        {
            res.writeHead(200, {
                "Content-Type": "application/octet-stream"
            });
            var buf = Buffer.from(image.img.data); // Ta-da
            res.write(buf || 'Please reload page');
            res.end();
        }
        else
        {
            res.status(400).json({message:"File does not exist"});
        }
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>
{
        if(req.busboy != undefined)
        {
            req.pipe(req.busboy);
            req.busboy.on('file', async function (fieldname, file, filename) 
            {
                var buffers = [];
                file.on('data', async function(buffer) {
                  buffers.push(buffer);
                });
                file.on('end', async function() {
                    try{
                        var buffer = Buffer.concat(buffers);
                        let rr = await Image.addOne({"name":fieldname,"data":buffer});
                        res.status(201).json({_id:rr._id});
                    }
                    catch(err) {
                        res.status(500).json({message:err.message});
                    }
                });

            });
        }
    
});


module.exports = router;