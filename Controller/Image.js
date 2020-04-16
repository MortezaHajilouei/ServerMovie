const Image = require('../Models/Image');


async function list()
{
    let res = []
    res = await Image.find();
    return res;
}


async function names(id)
{
    let filter=[];
    for(i of id)
    {
        filter.push(i._id);
    }
    let res = []
    res = await Image.find({'_id': { $in: filter}});
    return res;
}

async function name(id)
{
    let res = await Image.find({_id:id});
    return res;
}

async function addOne(it)
{
    let temp = new Image({
        path: it.path,
        contentType: it.type
    });
    let i = await temp.save();
    return i;
}

async function add(listDirectors)
{
    var dr=[]
    for(var item of listDirectors)
    {
        let temp = new Image({
            path: item.path,
            contentType: item.type
        });
        let i = await temp.save();
        dr.push(i._id);
    }
    return dr;
}

async function del(id){
    await Image.deleteOne({_id:id});
}

module.exports = {name,add,names,del,list,addOne};