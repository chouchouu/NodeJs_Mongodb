const Buy = require('../models/buy');
const Type =require('../models/nametype');

exports.getAll = async (req,res)=>{
let kieu =await Type.find().lean();
let buy = await Buy.find({})
.populate({path:"tentype",select:"loaitype matype"})
.lean(); 
    res.render("shop",{
        list: buy,
        typed:kieu,

    });
};

//lay duwx lieeuj
exports.getBuy =function(req,res){
    Buy.findById(req.params.id)
    .lean()
    .exec((err,doc)=>{
        if(!err){
        res.render('edit',{Buy:doc});
    }
    });
};
//edit
exports.edit = function(req,res){
    Buy.updateOne(
        {_id:req.body._id},//where
        {$set:{name:req.body.name,price:req.body.price,describe:req.body.describe,tentype:req.body.tentype,image:req.body.image}},//wwhat
        (err,doc)=>{
            if(!err){
                res.redirect('/shop');
            }else{
                console.log('Edit Failed');
            }
        }
    );
};
exports.delete = function(req,res){
    Buy.deleteOne(
        {_id:req.params.id},(err,doc) =>{
        if(!err){
            res.redirect('/shop');
        }else{
            console.log(err);
        
        }
    });
};
    /*Type.find().lean().
    exec(function(err,type){
if(err){
        res.json({
            result:"failed",
            data:[],
            message: "error"
        });
    }else{
    
        Buy.find({})
        .populate("TypeFashion")
        .lean()
        .exec(function(err,data){
            res.render('shop',{list:data.reverse(),
                typed: type,
            
            });
            console.log(data);
            if(err){
                log(err);
            }
        });
    }

    });*/