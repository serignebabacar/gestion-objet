'use strict'
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Objet', {useNewUrlParser: true})
// eslint-disable-next-line new-cap
let objetSchema = mongoose.Schema({
    nom : String,
    type : String,
    description : String
})
let Objet = mongoose.model('Objet', objetSchema)
class ObjetLoove {
    static getContent(cb) {
        Objet.find((err, objets) => {
            if (err) {
                console.error(err)
                return
            }
            cb(objets)
        })
    }
    static create(nom, type, description, cb) {
        let objet = new Objet()
        objet.nom = nom
        objet.type = type
        objet.description = description
        objet.save((err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    }
    static delete(id, cb) {
        Objet.deleteOne({_id: id}, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    }
}
module.exports = ObjetLoove