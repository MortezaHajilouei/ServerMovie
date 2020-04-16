const Image = require('../Models/Image');


async function list()
{
    let res = []
    res = await Image.find().select('_id modefiedTime name');
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
    let res = await Image.findOne({_id:id});
    return res;
}

async function addOne(it)
{
    let temp = new Image;
    temp.img.data = it.data;
    temp.name = it.name;
    temp.img,contentType = "";
    let i = await temp.save();
    return i;
}

async function add(listDirectors)
{
    var dr=[]
    for(var item of listDirectors)
    {
        let temp = new Image;
        temp.name = item.name;
        temp.img.data = item.data;
        temp.img.contentType = 'image/png';
        let i = await temp.save();
        dr.push(i._id);
    }
    return dr;
}

async function del(id){
    return await Image.deleteOne({_id:id});
}

module.exports = {name,add,names,del,list,addOne};