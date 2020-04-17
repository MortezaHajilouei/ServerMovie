const Person = require('../Models/Person');

async function GetAll(filter)
{
    if(filter != undefined)
        return await Person.find({type:filter});
    return await Person.find();
}

async function GetList(id)
{
    let filter=[];
    for(i of id)
    {
        filter.push(i._id);
    }
    let res = []
    res = await Person.find({'_id': { $in: filter}});
    return res;
}


async function GetInfo(id)
{
    let res = await Person.findOne({_id:id});
    return res;
}

async function add(listDirectors,job)
{
    var dr=[]
    for(var item of listDirectors){
        var temp = await Person.find({name:item});
        if(temp.length == 0)
        {
            let temp = new Person({name:item,type:job});
            let i = await temp.save();
            dr.push(i);
        }
        else
        {
            dr.push(temp[0]);
        }
    }
    return dr;
}

async function update(id,result)
{
    let r = await Person.findOneAndUpdate({_id:id},result);
    return r;
}

async function del(id)
{
    return await Person.deleteOne({_id:id});    
}

module.exports = {GetAll,GetInfo,add,GetList,update,del};