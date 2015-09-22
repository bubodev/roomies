import express  from 'express';
import mongoose from 'mongoose';
import User from '../config/models/User';
import Task from '../config/models/Task';
import Home from '../config/models/Home';
import Transaction from '../config/models/Transaction';
import { MONGO_URI } from './secrets';

const options = { server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, 
                  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}};

mongoose.connect( MONGO_URI, options ); 

let router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: "Welcome to the api server"
  });
});

/** USERS **/

// loadUser()
router.get('/users/:id', function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if(err){
      res.status(400).send(err);
      return;
    }
    res.json(user);
  })
})

// deleteUser()
router.delete('/users', function(req, res) {
  if(req.user.homeId) {
    res.status(400).send("You need to remove yourself from the home first!");
    return;
  }

  let id = req.user._id;
  console.log(id);
  
  User.findByIdAndRemove(id, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("successful")
    }
  })
})

/** TASKS **/

// getTasks()
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

// completeTask()
router.put('/tasks/:id', function(req, res) {
  let homeId = req.body.homeId;
  if(!homeId) {
    res.status(400).send("Sorry, couldn't process that request");
    return;
  }
  Home.findById(homeId, function(err, home) {
    if(err) {
      res.status(400).send("Sorry, couldn't find that house");
      return;
    } else {
      let task = home.tasks.id(req.params.id);

      const users = home.users;
      let oldUser = task.currentUser;
      let oldIdx;
      users.forEach(function(user, i) {
        if(user._id.equals(oldUser)){
          oldIdx = i;
        }
      })

      let newIdx = (oldIdx + 1) % users.length;
      task.currentUser = users[newIdx];
      task.save(function(err) {
        if(err) {
          res.status(400).send("error saving");
          return;
        } else {
          res.json(task);
        }
      });
    }
  })
})

// createTask()
router.post('/tasks', function(req, res) {
  let newTask = new Task(req.body.taskParams);
  let homeId = req.body.homeId;

  Home.findById(homeId, function(err, home) {
    if(err) {
      res.status(400).send("Sorry, couldn't find that home");
      return;
    } else {
      let index = Math.floor(Math.random() * home.users.length);
      newTask.currentUser = home.users[index];
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

// getHome()
router.get('/homes/:id', function(req, res) {
  Home.findById(req.params.id, function(err, home) {
    if(err)
      res.send(err);

    res.json(home);
  })
})

// createHome()
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

// removeUserFromHome()
router.delete('/homes/:id/:userId', function(req, res) {
  let id = req.params.id;
  let userId = req.params.userId;

  Home.findById(id, function(err, home) {
    if(err || !home)
      res.status(400).send("Sorry, couldn't find that home");

    home.users.id(userId).remove(); //remove out of embedded users doc

    home.save(function(err) {
      if(err) {
        res.status(400).send("Couldn't find that user in the house")
        return;
      }
    })

    User.findById(userId, function(err, user) {
      user.homeId = null;
      user.save();
    })

    res.json({
      message: "Successfully removed user!"
    })
  })
})

// addUserToHome()
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