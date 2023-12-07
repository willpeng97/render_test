let gridASID = '330710299730972';
var gridAData;

// 取得 grid API
async function getGridData(gridASID) {
  // 定义 GetGrid API 的 URL
  var getGridURL = 'http://cloud.weyutech.com/ESG_BIAPIV2/api/GetGrid';

  // 定义要传递的参数对象
  var params = {
      SID: gridASID,
      TokenKey: '302e24cbG8xfcHU/Z/vTzA1zYjVFHLfUNtqsWonT'
  };

  // 定义查詢条件参数对象
  var conditions = {
      // 每個SID 要塞的條件皆不同,塞錯會掛
      // Field: ["INSPECT_BIG_ITEM_CODE", "INSPECT_DATE"],
      // Oper: ["like", "between"],
      // Value: ["WEEK", "2021-12-06 00:00:00~2021-12-07 00:00:00"]
  };

  // 构建请求头
  var headers = new Headers({
      'Content-Type': 'application/json',
      'SID': params.SID,
      'TokenKey': params.TokenKey
  });

  // 构建请求体
  var requestBody = JSON.stringify(conditions);

  // 构建请求配置
  var requestOptions = {
      method: 'POST', // 将请求方法设置为 "POST"
      headers: headers,
      body: requestBody // 将条件参数放入请求体
  };

  try {
      // 发送请求并等待响应
      var response = await fetch(getGridURL, requestOptions);

      if (response.ok) {
          // 解析响应为 JSON
          gridAData = await response.json();
          console.log('成功取得回應');
          console.log(gridAData);
          console.log(gridAData.Grid_Data)

      } else {
          throw new Error('获取Grid数据失败，状态码：' + response.status);
      }
  } catch (error) {
      console.error(error);
  }
}
getGridData(gridASID)