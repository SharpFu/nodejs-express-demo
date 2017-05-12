var express = require('express');
var router = express.Router();
var noteDao = require("../dao/noteDao");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*增加笔记*/
router.get('/addNote',function(req,res,next){
    noteDao.add(req,res,next);
});
/*获取所有笔记*/
router.get('/getAll',function(req,res,next){
    noteDao.queryAll(req,res,next);
});
/*删除记录*/
router.get('/delete',function(req,res,next){
    noteDao.delete(req,res,next);
});


module.exports = router;
