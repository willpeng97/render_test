const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
const html=
`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chart練習</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="canva">
      <div class="headbar">Chart1</div>
      <canvas id="myChart1"></canvas>
    </div>
    <div class="canva">
      <div class="headbar">Chart2</div>
      <canvas id="myChart2"></canvas>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
    <script src="./js/draw.js"></script>
    <!-- <script src="./js/girdData.js"></script> -->
  </body>
</html>
`