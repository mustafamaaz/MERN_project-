const mongoose = require('mongoose');

const {Schema} = mongoose;   //destructuring  make sure in Schema S is capital

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',UserSchema);
//  abh mery collection ka name users hy but idher user likha q ky mongoose as a plular lrta hy name ko collection ky to mtlb idher user ka mtlb hy collection users 
// agr me plular ni krna chta change name rakhna cahta hun to ye  code hoga

// const User = mongoose.model('MyCustomCollectionName', UserSchema);
// module.exports = User;


// schema wraped into model and we do curd operation using model in mongoose and user is a collection name 