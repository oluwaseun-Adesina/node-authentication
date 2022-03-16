const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'PLease enter a valid email']
        //validate: [(val) => {}, 'PLease enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6,'Minimum passowrd length is 6 characters']

    },
    phone: {
        type: String,
        required: [true,'Please enter phone number'],
        maxlength: [13, 'Maximum phone number length is 13 character']
    },
    address: {
        type: String,
        required: [true, 'Please enter address'],
        lowercase: true
    }
});

// fire a function after doc saved to db

// userSchema.post('save', function (doc, next) {
//     console.log('new user was created & saved', doc);
//     next();
// })


//fire a function before doc saved to db 
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})


const User = mongoose.model('user', userSchema);

module.exports = User;