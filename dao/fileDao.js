//实现与mysql交互
var mysql  = require("mysql");
var $conf = require("../db/DBConfig");
var $sql = require("../model/fileModel");
// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

var jsonWrite = function(res,ret){
    if(typeof ret === 'undefined'){
        res.json({
            code:'1',
            msg:"操作失败"
        })
    }else{
        res.json(ret);
    }
};
module.exports = {
    add:function(params,res,next){
        pool.getConnection(function(err,connection){
            connection.query($sql.insert,[params.fileName,params.path,params.size,params.type],function(err,result){
                if(result){
                    result={
                        code:200,
                        msg:'添加成功'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res,result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
          var name = req.query.name;
          connection.query($sql.delete, name, function(err, result) {
            if(result.affectedRows > 0) {
              result = {
                code: 200,
                msg:'删除成功'
              };
            } else {
              result = void 0;
            }
            jsonWrite(res, result);
            connection.release();
          });
        });
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryAll, function(err, result) {
        jsonWrite(res, result);
        connection.release();
      });
    });
  }
}
