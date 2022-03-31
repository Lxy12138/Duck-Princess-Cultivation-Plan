const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 选择商品
exports.main = async (event, context) => {
  // 返回数据库查询结果
  //修复了1.0的读取Goods单条记录的的只能读取第一条的问题
  if(event.event && event.event.id){
    return await db.collection('goods').where({
      _id: event.event.id
    }).get();
  } else {
    return await db.collection('goods').where({
      is_online: true
    }).get()
  }
};
