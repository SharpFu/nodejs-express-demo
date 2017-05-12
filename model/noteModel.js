// 增删查改 SQL语句
var notes = {
  insert:'INSERT INTO notes(id, title, content,type,easy) VALUES(0,?,?,?,?)',
  update:'update notes set title=?, content=? where id=?',
  delete: 'delete from notes where id=?',
  queryById: 'select * from notes where id=?',
  queryAll: 'select * from notes'
};
module.exports = notes;