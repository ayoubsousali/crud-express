const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongojs = require('mongojs')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://ayoub:123@ds111648.mlab.com:11648/taskslist_sousali', (err, database) => {
  // ... start the server
  if (err) return console.log(err)
  db = database.db('taskslist_sousali')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })

  //ajouter task
  app.post('/tasks', (req, res) => {
    db.collection('tasks').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('bien enregistrer')
      res.redirect('/')
    })
  })

  //fecth tasks
  app.get('/', (req, res) => {
    db.collection('tasks').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {tasks: result})
    })
  })





})

// supprimer task
app.post('/delete/:id', (req, res, next) => {
    var o_id = mongojs.ObjectId(req.params.id)
    db.collection('tasks').remove({"_id": o_id}, (err, result) => {
        if (err) {
            res.redirect('/')
        } else {
            res.redirect('/')
        }
    })
})






//body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//view engine
app.set('view engine', 'ejs')
