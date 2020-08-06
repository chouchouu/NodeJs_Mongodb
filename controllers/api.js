const Buys = require('../models/buy');
const Catagory = require('../models/nametype');
const Use =require('../models/admin');
exports.getBuy = async (req, res) => {
    try {
        let buy = await Buys.find();
        return res.status(200).json({ status: true, data: buy });
    } catch (err) {
        console.log(err);
    }
};
exports.getUser =async (req, res) => {
    try{
        let user =await Use.find({});
        res.send(user);
    }catch(err){
        console.log(err);
    }
}
//get theo id
exports.getSp = async (req, res) => {
    try {
        let sp = await Buys.find({tentype:req.params.id});
        return res.status(200).json({ status: true, data: sp });
    }catch (err) {
        console.log(err);
    }
}
//loại sp
exports.getCatagory =async (req, res) => {
    try{
        let cate =await Catagory.find({});
        res.send(cate);

    }catch (err) {
        console.log(err);
    }
}
//
exports.getloai = async (req, res) => {
   
    try{
        let buys =await Buys.find({price:req.params.price});
        res.send(buys);
    }catch (err) {
        console.log(err);
    }


}

exports.getAll = async (req, res) => {
    try {
        let buys = await Buys.find({});
        res.send({ status: true, data: buys });
        /*let buys = await Buys.find({}).populate({
            path: "tentype",
            select:"loaitype && picture"
        });*/
        
    }
    catch (err) {
        console.log(err);
    }

};


exports.editBuy = async (req, res) => {
    try {
        let buy = await Buys.findById(req.params.id);
        buy.set(req.body);
        let result = await buy.save();
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};
exports.deleteBuy = async (req, res) => {
    try {
        let result = await Buys.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};