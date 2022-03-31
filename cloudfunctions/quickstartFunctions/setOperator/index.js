const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 添加记录
exports.main = async (event, context) => {
  const data = event.data
  // 返回数据库查询结果
  if(data.operator_type=='exchange rewards'){
    console.log("添加兑换goods记录");
    return await db.collection('user_operator').add({
      data:[
        {
          goods_id: data.goods_id,
          operator_type: data.operator_type,
          operator_time: new Date()
        }
      ]
    });
  }else{
    console.log("添加完成任务的记录");
    return await db.collection('user_operator').add({
      data: [{
        mission_id: data.mission_id,
        operator_type: data.operator_type,
        operator_time: new Date()
      }]
    });
  }
  
};
