const Person = require('../Models/Person');

async function list()
{
    let res = await Person.find();
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
    res = await Person.find({'_id': { $in: filter}});
    return res;
}


async function name(id)
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
            dr.push(i._id);

        }
        else
        {
            dr.push(temp[0]._id);
        }
    }
    return dr;
}

async function update(id,result){
  
    let r = await Person.findOneAndUpdate({_id:id},result);
    return r;
}


module.exports = {list,name,add,names,update};