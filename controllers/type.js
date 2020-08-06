const typeproduct = require('../models/nametype');

exports.getAll = function(req,res){
    typeproduct.find({})
    .lean()
    .exec(function(err,data){
        res.render('type',{watchList:data.reverse()});
        console.log(data);
        if(err){
            log(err);
        }
    });
};

//lấy dữ liệu
exports.getType =function (req,res){
  typeproduct.findById(req.params.id)
  .lean()
  .exec((err,doc)=>{
      if(!err){
          res.render('edittype',{typeproduct:doc});
      }
  });
};
//edit 
exports.edittype = function(req,res){
    typeproduct.updateOne(
       { _id: req.body._id},
        {$set:{loaitype:req.body.loaitype,picture:req.body.picture}},
        (err,doc)=>{
            if(!err){
                res.redirect('/type');
            }else{
                console.log(err);
            }
        }
    );
};

//delete
exports.deletetype = function(req,res){
    typeproduct.deleteOne(
        {_id:req.params.id},(err,doc)=>{
            if (!err){
                res.redirect('/type');
            }else{
                console.log(err);
            }
        }
    )
}