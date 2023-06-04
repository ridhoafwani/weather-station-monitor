/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"
import "react-datepicker/dist/react-datepicker-min.module.css"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chart1_2_options,
} from "variables/charts.js";
import { onValue, ref } from "firebase/database";
import { db } from "utils/firebase";

function retriveFirebaseData(date){
  //Retrive firebase data
  const starCountRef = ref(db, 'C1/' + date);
  onValue(starCountRef, (snapshot) => {
    if (snapshot.exists()){
      const data = snapshot.val();
      updateKelembabanChart(data);
      updateKecepatanAnginChart(data);
      updateCurahHujanChart(data)
    }
    else {
      updateKelembabanChart(null)
      updateKecepatanAnginChart(null);
      updateCurahHujanChart(null)
    }
  });

}

function updateCurahHujanChart(data){
  const dataCurahHujan = new Array(24).fill(0);

  if(data !== null){
    for(const key in data){
      let curahHujan = 0.0;
      let objLength = 0
      for(const x in data[key]){
        const dataPerMenit = parseFloat(data[key][x]['curah_hujan_menit_ini'])
        if(typeof dataPerMenit !== 'undefined' && isNaN(dataPerMenit) === false && dataPerMenit !== 0){
          curahHujan += dataPerMenit
          objLength += 1
          console.log(dataPerMenit)
        }
      }
      dataCurahHujan[+key] = isNaN(curahHujan/objLength) ? 0 : curahHujan/objLength
      console.log(dataCurahHujan)
      console.log(`Curah Hujan rata2 : ${curahHujan/objLength}`)
      console.log(objLength)
    }
  }

  chartExample4 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
      gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
      gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors
  
      return {
        labels: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "19",
          "20",
          "21",
          "22",
          "23"
        ],
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dataCurahHujan,
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
  
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
        xAxes: {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      },
    },
  };
}

function updateKecepatanAnginChart(data){
  const dataKecepatanAngin = new Array(24).fill(0);

  if(data !== null){
    for(const key in data){
      let kecAngin = 0.0;
      let objLength = 0
      for(const x in data[key]){
        const dataPerMenit = parseFloat(data[key][x]['kecepatan_angin'])
        if(typeof dataPerMenit !== 'undefined' && isNaN(dataPerMenit) === false && dataPerMenit !== 0){
          kecAngin += dataPerMenit
          objLength += 1
          console.log(dataPerMenit)
        }
      }
      dataKecepatanAngin[+key] = isNaN(kecAngin/objLength) ? 0 : kecAngin/objLength
      console.log(dataKecepatanAngin)
      console.log(`Kecepatan angin rata2 : ${kecAngin/objLength}`)
      console.log(objLength)
    }
  }

  chartExample1 = {
    data1: (canvas) => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "19",
          "20",
          "21",
          "22",
          "23"
        ],
        datasets: [
          {
            label: "Suhu dalam Celcius",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dataKecepatanAngin,
          },
        ],
      };
    },
    options: chart1_2_options,
  };
}

function updateKelembabanChart(data){
  const dataKelembaban = new Array(24).fill(0);

  if(data !== null){
    for(const key in data){
      let kelembaban = 0.0;
      let objLength = 0
      for(const x in data[key]){
        const dataPerMenit = parseFloat(data[key][x]['kelembaban'])
        if(typeof dataPerMenit !== 'undefined' && (isNaN(dataPerMenit)) === false && dataPerMenit !== 0){
          kelembaban += dataPerMenit
          objLength += 1
        }
      }
      dataKelembaban[+key] = isNaN(kelembaban/objLength) ? 0 : kelembaban/objLength
      console.log(`array kelembaban : ${dataKelembaban}`)
      console.log(`Kelembaban rata2 : ${kelembaban/objLength}`)
    }
  }

  chartExample2 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "19",
          "20",
          "21",
          "22",
          "23"
        ],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dataKelembaban,
          },
        ],
      };
    },
    options: chart1_2_options,
  };
  
}



function Dashboard(props) {
  const [bigChartData] = React.useState("data1");
  
  // Date Picker
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="9">
                  <h5 className="card-category">Data rata-rata berdasarkan waktu</h5>
                    <CardTitle tag="h2">Kecepatan Angin</CardTitle>
                  </Col>
                  <Col className="text-right" sm="3">      
                    <ReactDatePicker
                    className="btn-simple card-category"
                    selected={startDate}
                    dateFormat="MM:dd:yyyy"
                    onChange={(date) => {
                      const fullMonth = date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1
                      const fullDate = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()
                      let formattedDate = `${
                        fullMonth
                      }:${fullDate}:${date.getFullYear()}`;
                      setStartDate(date)
                      const data = {date: formattedDate}
                      retriveFirebaseData(data.date)
                      console.log(data.date)
                    }}
                  />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Data rata-rata berdasarkan waktu</h5>
                <CardTitle tag="h2">Kelembaban</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
            </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Data rata-rata berdasarkan waktu</h5>
                <CardTitle tag="h3">
                  Curah Hujan
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
              <h5 className="card-category">Data rata-rata berdasarkan waktu</h5>
                <CardTitle tag="h3">
                  Kecepatan Angin
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    </>
  );
}

export default Dashboard;
