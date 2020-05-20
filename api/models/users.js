const mongoose = require("mongoose");

//var kittySchema = new mongoose.Schema({ name: String });

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    lastName:String
})

module.exports = mongoose.model("Users", UserSchema);