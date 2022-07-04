const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let urlSchema = new Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    visits :{type:Number , default:0},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

let Url = mongoose.model('url',urlSchema);

module.exports = Url;
