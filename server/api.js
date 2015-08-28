import express  from 'express';
import mongoose from 'mongoose';
import User from '../config/models/Users';
import Task from '../config/models/Tasks';

mongoose.connect('mongodb://localhost/test'); 

let router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: "Welcome to the api server"
  });
});

/** USERS **/
router.get('/users', function(req, res) {
  User.findOne({}, (err, user) => {
    res.json({
      message: "GET to users",
    })
  });
})

router.put('/users', function(req, res) {
  res.json({
    message: "PUT to users"
  })
})

router.post('/users', function(req, res) {
  res.json({
    message: "POST to users"
  })
})

router.delete('/users', function(req, res) {
  res.json({
    message: "DELETE to users"
  })
})

/** TASKS **/
router.get('/tasks', function(req, res) {
  res.json({
    message: "GET to tasks"
  })
})

router.get('/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function(err, task) {
    if(err)
      res.send(err);

    res.json(task);
  })
})

router.put('/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function(err, task) {
    if(err)
      res.send(err);

    task.completed = req.body.completed;

    task.save(function(err) {
      if(err)
        res.send(err);

      res.json(task);
    })
  })
})

router.post('/tasks', function(req, res) {
  let newTask = new Task(req.body.taskParams);

  newTask.save(function(err) {
    if(err)
      res.json(err);
    res.json(newTask);
  })
})

/** HOMES **/
router.post('/homes', function(req, res) {
  res.json({
    message: "posted to the homes resource"
  })
})

module.exports = router;