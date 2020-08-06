const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const kieu =new Schema({
    loaitype:{type:String},
    picture:{type:String},
});
module.exports =mongoose.model('TypeFashion',kieu);