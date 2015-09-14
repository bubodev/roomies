import express  from 'express';
import mongoose from 'mongoose';
import User from '../config/models/Users';
import Task from '../config/models/Tasks';
import Home from '../config/models/Homes';
import Transaction from '../config/models/Transactions';


mongoose.connect('mongodb://localhost/test'); 

let router = express.Router();

router.get('/', function(req, res) {
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
router.get('/homes/:id', function(req, res) {
  Home.findById(req.params.id, function(err, home) {
    if(err)
      res.send(err);

    res.json(home);
  })
})

router.post('/homes', function(req, res) {
  console.log("hit home creation api");
  let newHome = new Home(req.body.homeParams);
  User.findById(req.body.userId, function(err, user) {
    if(err)
      res.json(err);
    newHome.users.push(user);
    newHome.save(function(err) {
      if(err)
        res.json(err);
      user.homeId = newHome._id;
      user.save(function() {
        res.json(newHome);
      });
    })
  })
})


router.put('/homes', function(req,res) {
  Home.findById(req.body.houseCode, function(err, home) {
    if(err)
      res.send(err);

    User.findById(req.body.userId, function(err, user) {
      home.users.push(user)
      user.homeId = home._id;

      user.save(function(err) {
        if(err)
          res.json(err);
        res.json(home);
      })
    })
  })
})

/** TRANSACTIONS **/
router.get('/transactions', function(req, res) {
  Transaction.find({}, function(err, transactions) {
    if(err)
      res.send(err);
    res.json(transactions);
  })
})

router.get('/transactions/:id', function(req, res) {
  Transaction.findById(req.params.id, function(err, task) {
    if(err)
      res.send(err);

    res.json(task);
  })
})

router.put('/transactions/:id', function(req, res) {
  Transaction.findById(req.params.id, function(err, task) {
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

router.post('/transactions', function(req, res) {
  let newTransaction = new Transaction(req.body.transactionParams);
  newTransaction.save(function(err) {
    if(err)
      res.json(err);
    res.json(newTransaction);
  })
})

module.exports = router;