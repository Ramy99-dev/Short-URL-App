const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email : {type: String , required:true},
    password : {type:String , required:true},
    active :{type:Boolean , default:false},
    urls : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Url'}
    ]
})

let User = mongoose.model('user',userSchema);

module.exports = User;