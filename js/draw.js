// API START
let gridASID = "330710299730972";
let gridAData;

// 取得 grid API
async function getGridData(gridASID) {
  // 定义 GetGrid API 的 URL
  var getGridURL = "http://cloud.weyutech.com/ESG_BIAPIV2/api/GetGrid";

  // 定义要传递的参数对象
  var params = {
    SID: gridASID,
    TokenKey: "302e24cbG8xfcHU/Z/vTzA1zYjVFHLfUNtqsWonT",
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
    "Content-Type": "application/json",
    SID: params.SID,
    TokenKey: params.TokenKey,
  });

  // 构建请求体
  var requestBody = JSON.stringify(conditions);

  // 构建请求配置
  var requestOptions = {
    method: "POST", // 将请求方法设置为 "POST"
    headers: headers,
    body: requestBody, // 将条件参数放入请求体
  };

  try {
    // 发送请求并等待响应
    var response = await fetch(getGridURL, requestOptions);

    if (response.ok) {
      // 解析响应为 JSON
      gridAData = await response.json();
      console.log("成功取得回應");
    } else {
      throw new Error("获取Grid数据失败，状态码：" + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}
// API END

async function drawCanvas() {
  // 等待連線API取得數據
  await getGridData(gridASID);

  // 處理數據
  let populationTaipei = [];
  let populationHsinchu = [];
  let years = [];

  gridAData.Grid_Data.forEach((item) => {
    populationTaipei.push(item.TAIPEI);
    populationHsinchu.push(item.HSINCHU);
    years.push(item.COUNT_MONTH);
  });

  // 畫圖

  let chartCanva1 = null;
  let chartCanva2 = null;
  let lineALabel = "Taipei";
  let linePopulation = populationTaipei;

  function updateChart() {
    if (chartCanva1 || chartCanva2){
      chartCanva1.destroy();
      chartCanva2.destroy();
    }


    // 1.柱狀圖
    const barAChart = document.getElementById("myChart1").getContext("2d");
    const barData = {
      plugins: [ChartDataLabels],
      options: {

      },
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label: "PopulationTaipei",
            data: populationTaipei,
            backgroundColor: "yellow", // 柱狀的填充顏色
            borderColor: "white", // 柱狀的邊框顏色
            borderWidth: 1, // 柱狀的邊框寬度
          },
          {
            label: "PopulationHsinchu",
            data: populationHsinchu,
            backgroundColor: "rgba(75, 192, 192, 0.2)", // 柱狀的填充顏色
            borderColor: "white", // 柱狀的邊框顏色
            borderWidth: 1, // 柱狀的邊框寬度
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              color: "gray", // 更改X轴的网格线颜色
            },
            ticks: {
              color: "white", // 更改X轴标签的颜色
            },
          },
          y: {
            grid: {
              color: "grey", // 更改Y轴的网格线颜色
            },
            ticks: {
              color: "orange", // 更改Y轴标签的颜色
            },
          },
        },
      },
    };
    chartCanva1 = new Chart(barAChart, barData);

    // 2.線性圖
    const lineAChart = document.getElementById("myChart2").getContext("2d");
    
    const lineData = {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: lineALabel,
            data: linePopulation,
            borderColor: "red",
            backgroundColor: "black",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "orange",
            },
          },
        },
        
      },
    };
    chartCanva2 = new Chart(lineAChart, lineData);

    // 定時更新圖表
    setTimeout(() => {
      lineALabel = lineALabel === "Taipei" ? "Hsinchu" : "Taipei";
      // linePopulation = lineALabel === "Taipei" ? populationTaipei : populationHsinchu;
      linePopulation = [Math.random(), Math.random(),Math.random(),Math.random(),Math.random()];
      updateChart();
      console.log(lineALabel);
    }, 3000); // 60000 毫秒等于一分钟

  }

  updateChart();
}

drawCanvas();