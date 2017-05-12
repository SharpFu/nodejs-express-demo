// 增删查改 SQL语句
var files = {
  insert:'INSERT INTO files(id, fileName, path,size,type) VALUES(0,?,?,?,?)',
  update:'update files set title=?, content=? where id=?',
  delete: 'delete from files where fileName=?',
  queryById: 'select * from files where id=?',
  queryAll: 'select * from files'
};
module.exports = files;