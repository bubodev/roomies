import express  from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test'); 

let router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: "welcome to the roomies api server"
  });
});

/** USERS **/
router.get('/users', function(req, res) {
  res.json({
    message: "GET to users"
  })
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
router.post('/tasks', function(req, res) {
  res.json({
    message: "posted to the tasks resource"
  })
})

/** HOMES **/
router.post('/homes', function(req, res) {
  res.json({
    message: "posted to the homes resource"
  })
})

module.exports = router;