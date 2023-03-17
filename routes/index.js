var express = require('express');
var router = express.Router();
const sql = require("../dboperation");
const sqll = require("mssql");
var config = require("../dbconfig");

/* GET home page. */
console.log("API started")

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//test connection
router.get('/testconnect', function (req, res, next) {
  sql.getdata();
  res.render('index', { title: 'Express' });
});

router.get("/getdata_withQuery", function (req, res, next) {
  sql.getdata_withQuery().then((result) => {
    res.json(result);
  });
});


router.post('/student/CRUD', function (req,res){
  sql.studentAPI(req.body).then(result=>{
    var data
    console.log(result)
    data.Data = result[0]
    res.json(data)
  })

})

router.get("/getuser", function (req, res, next) {

  sql.getUser(req.query.email, req.query.password).then((result) => {
    
    if(result?.length == 0){
      result = [{message : 'User not find'}]
      res.json(result);
    }else{
      res.json(result);
    }
  });
});


router.get("/getDropDownMaster", function (req, res) {
  console.log(req.query.Key1+"  "+req.query.Key2)
  sql.getDropDownMaster(req).then((result) => {
    console.log(result[0])
    res.json(result)
  })
})
module.exports = router;
