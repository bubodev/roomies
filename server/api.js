import express  from 'express';
import mongoose from 'mongoose';
import User from '../config/models/User';
import Task from '../config/models/Task';
import Home from '../config/models/Home';
import Transaction from '../config/models/Transaction';
import { MONGO_URI } from './secrets';

mongoose.connect( MONGO_URI ); 

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
router.get('/tasks/:homeId', function(req, res) {
  let homeId = req.params.homeId;
  Home.findById(homeId, function(err, home) {
    if(err){
      res.status(400).send("Error! Couldn't find that home")
    } else {
      res.json(home.tasks);
    }
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
  let homeId = req.body.homeId;

  Home.findById(homeId, function(err, home) {
    if(err) {
      res.status(400).send("Sorry, couldn't find that home");
      return;
    } else {
      home.tasks.push(newTask);
      home.save(function(err) {
        if(err){
          res.status(400).send("Sorry, an error has occured");
          return;
        } else {
          res.json(newTask);
        }
      });
    }
  })
});


/** HOMES **/
router.get('/homes/:id', function(req, res) {
  Home.findById(req.params.id, function(err, home) {
    if(err)
      res.send(err);

    res.json(home);
  })
})

router.post('/homes', function(req, res) {
  let newHome = new Home(req.body.homeParams);
  User.findById(req.body.userId, function(err, user) {
    if(err) {
      res.status(400).send("Sorry, couldn't find that user");
    } else {
      newHome.users.push(user);
      newHome.save(function(err) {
        if(err) {
          res.status(400).send(err);
        } else {
          user.homeId = newHome._id;
          user.save(function() {
            res.json(newHome);
          });
        }
      })
    }
  })
})


router.put('/homes/:id', function(req,res) {
  Home.findById(req.params.id, function(err, home) {
    if(err) {
      res.status(400).send("Sorry, couldn't find that house...");
    } else {
      User.findById(req.body.userId, function(err, user) {
        home.users.push(user)
        user.homeId = home._id;

        user.save(function(err) {
          if(err)
            res.status(400).send("Hmm... something went wrong");
        })

        home.save(function(err) {
          if(err) {
            res.status(400).send("Hmm... something went wrong");
          } else {
            res.json(home);
          }
        })
     })
    }
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