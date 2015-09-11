import express  from 'express';
import mongoose from 'mongoose';
import User from '../config/models/Users';
import Task from '../config/models/Tasks';

mongoose.connect('mongodb://localhost/test'); 

let router = express.Router();

router.get('/', function(req, res) {
  console.log("hit api server");
  res.json({
    message: "Welcome to the api server"
  });
});

/** USERS **/
router.get('/users/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err)
      res.send(err);

    res.json(user);
  })
})

router.delete('/users', function(req, res) {
  res.json({
    message: "DELETE to users"
  })
})

/** TASKS **/
router.get('/tasks', function(req, res) {
  Task.find({}, function(err, tasks) {
    if(err)
      res.send(err);
    res.json(tasks);
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