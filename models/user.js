'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://localhost/Objet', {
})
// eslint-disable-next-line new-cap
let UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
})


let User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash
            newUser.save(callback)
        })
    })
}

module.exports.getUserByUsername = function(username, callback) {
    let query = {username}
    User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err
        }
        callback(null, isMatch)
    })
}