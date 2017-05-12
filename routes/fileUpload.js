var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var fileDao = require("../dao/fileDao");
/* GET home page. */
/*获取所有文件列表*/
router.get('/getAll',function(req,res,next){
    fileDao.queryAll(req,res,next);
})
/*删除文件*/
router.get('/delete',function(req,res,next){
    fileDao.delete(req,res,next);
})
 /* 上传*/
router.options('/uploading', function* (){
    this.set('Access-Control-Allow-Method', 'POST');
    this.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    this.status = 204;
});
 router.post('/uploading', function(req, res, next){
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/files/'});
  //上传完成后处理
    form.parse(req, function(err, fields, files) {
      var filesTmp = JSON.stringify(files,null,2);
      if(err){
        console.log('parse error: ' + err);
      } else {
        console.log('parse files: ' + filesTmp);
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var dstPath = './public/files/' + inputFile.originalFilename;
        //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
          if(err){
           console.log('rename error: ' + err);
          } else {
            var fileInfo = {
                fileName:inputFile.originalFilename,
                path:dstPath,
                size:inputFile.size,
                type:"图片"
            }
            fileDao.add(fileInfo,res,next);
            console.log('after insert into db: ');
          }
        });
      }
   });
});

module.exports = router;
