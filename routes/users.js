var express = require('express');
var router = express.Router();
const sql = require("../dboperation");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/status', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/testconnect', function (req, res, next) {
  sql.getdata();
  res.render('index', { title: 'Express' });
});



router.post('/JCRUD_ResourceWiseDailyTaskDetails', function(req, res, next){
 sql.ResourceWiseDailyTaskDetails(req.body).then(result => {
  var data
  // console.log(result[0]);
  data = {Data: result[0]}
  res.json(data)
 })
})


module.exports = router;
