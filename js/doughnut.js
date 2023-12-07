
let chartASID = '321618901510638'
// 取得 Chart API
async function getChartDataDoughnutA(chartASID) {
  // 定义 GetGrid API 的 URL
  var getGridURL = 'http://cloud.weyutech.com/ESG_BIAPIV2/api/GetChart';

  // 定义要传递的参数对象
  var params = {
      SID: chartASID,
      TokenKey: localStorage.getItem('ESG_BI_TokenKey')
  };

  // 定义查詢条件参数对象
  var conditions = {
      // 每個SID 要塞的條件皆不同,塞錯會掛 , 沒有條件就不用塞
      // Field: ["INSPECT_BIG_ITEM_CODE", "INSPECT_DATE"],
      // Oper: ["like", "between"],
      // Value: ["WEEK", "2021-12-06 00:00:00~2021-12-07 00:00:00"]
  };

  // 构建请求头
  var headers = new Headers({
      'Content-Type': 'application/json',
      'SID': params.SID,
      'TokenKey': '302e24cbG8xfcHU/Z/vTzA1zYjVFHLfUNtqsWonT'
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
          var chartAData = await response.json();

          // 標題欄位
          let doughnutATitle = document.querySelector('#doughnutATitle');
          doughnutATitle.innerHTML = chartAData.title;

          // 甜甜圈色彩
          let fillColor = ["#4c9ef6", '#fcb07d']

          // 甜甜圈小標題
          let chartALabels = chartAData.labels

          // 甜甜圈資訊欄
          let chartAdata = chartAData.data.datasets[0].data

          // 甜甜圈圖
          let chartDoughnutA  = document.querySelector('#doughnutAChart');
          new Chart(doughnutAChart, {
            type: "doughnut",
            data: {
              labels: chartALabels,
              datasets: [
                {
                  data: chartAdata,
                  backgroundColor: fillColor,
                  borderWidth: 0
                }
              ]
            }
          });
      } else {
        throw new Error(response.status);
      }
  } catch (error) {
      console.error(error);
  }
}
getChartDataDoughnutA(chartASID);