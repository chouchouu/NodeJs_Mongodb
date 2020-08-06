const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const buy =new Schema({
    name: {type:String},
    tentype:{type: Schema.Types.ObjectId, ref:'TypeFashion'},
    price:{type:String},
    describe:{type:String},
    image:{type:String},
});
module.exports =mongoose.model('Fashion',buy);