const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowecase:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: { type: String, required: true},
    password: { type: String, required: true},
    created:{
        type:Date,
        default:Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date 
   

});

// userSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password,this.hash_password);
// }

module.exports = mongoose.model('User', userSchema);
