const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/jwtsample');
const Schema = mongoose.Schema;
const buserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    businessid:{
        type: String,
        required: true
    }
});
const bUser = mongoose.model('bUser',buserSchema);

const signup = (buser,callback)=>{
    // synchronous method for hashing
    let hashedPassword = bcrypt.hashSync(buser.password,10);
    const buserObj = new bUser({
        firstName: buser.firstName,
        lastName: buser.lastName,
        email: buser.email,
        password: hashedPassword,
        phone: buser.phone,
        gender: buser.gender,
        businessid: buser.businessid,
    });
    bUser.create(buserObj,(err,response)=>{
        callback(err,response);
    });   
}
const findbUser = (email,callback)=>{
    bUser.findOne({ email: email},(err,data)=>{
        callback(err,data);
    });
}
module.exports= {
    signup : signup,
    findbUser : findbUser
}