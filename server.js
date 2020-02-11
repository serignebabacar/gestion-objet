'use strict'
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let content = require('./models/ObjetLoove')
app.set('view engine', 'ejs')


//Middlewares
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret: 'dcdccdcdc',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))

//Routes
app.get('/', (req, res) => {
    //var content = require('./models/ObjetLoove')
    res.render('pages/index')
})

app.get('/pages/donnees', (req, res) => {
    content.getContent((data) => {
        res.render('pages/donnees', {objets : data})
    })
})

app.get('/remove/:id', (req, res) => {
    content.delete(req.params.id, () => {
    })
    req.flash('error', ' suppression reussie ')
    res.redirect('/pages/donnees')
})
app.get('/update/:id', (req, res) => {
    content.find(req.params.id, (objet) => {
        res.render('pages/update', {item : objet})
    })
})
app.post('/', (req, res) => {
    let nom = req.body.nom
    let type = req.body.type
    let description = req.body.description
    if (req.body.id_update === undefined) {
        content.create(nom, type, description, () => {
        })
        req.flash('success', " l'objet a été ajouté  ")
        res.redirect('/')
    } else {
        content.find(req.body.id_update, (objet) => {
            objet.nom = nom
            objet.type = type
            objet.description = description
            objet.save((err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            req.flash('success', " l'objet a été modifie  ")
            res.redirect('/')
        })
    }
})
app.listen(8000, () => {
    console.log('Server started on  [localhost:5000](http://localhost:5000/).')
})