const mongoose = require("mongoose");
let Schema = mongoose.Schema;

//------- Address ---------
let addressSchema = Schema({
    street_name: String,
    house_number: Number,
    city: String,
    phone_number: String
});

//--------- User ---------------
let usersSchema = Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth_date: Date,
    addresses: [
        {ref: 'Address', type: Schema.Types.ObjectId}
    ]
});

//--------Convert Schema to Model----------
let addressModel = mongoose.model("Address", addressSchema);
let usersModel = mongoose.model("User", usersSchema);

//--------Export Model--------------------
module.exports = {
    users: usersModel,
    addresses: addressModel
};

