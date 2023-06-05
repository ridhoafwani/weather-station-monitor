/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
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
import React, { useEffect, useState } from "react";

// react plugin used to create charts
import { Line } from "react-chartjs-2";

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
  Table
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { onValue, ref } from "firebase/database";
import { db } from "utils/firebase";


function Dashboard_2(props) {

  const [chartSuhu, setChartSuhu] = useState(() => chartExample3.data(document.createElement('canvas')));
  const [chartKelembaban, setChartKelembaban] = useState(() => chartExample2.data(document.createElement('canvas')));
  const [chartKecepatanAngin, setChartKecepatanAngin] = useState(() => chartExample1.data(document.createElement('canvas')));
  const [chartCurahHujan, setChartCurahHujan] = useState(() => chartExample4.data(document.createElement('canvas')));
  const [tableData, setTableData] = useState(new Array(24).fill('-'));

  useEffect(() => {
    // Function to be run when the component starts
    retriveFirebaseData(formattedDate)
  },[formattedDate, retriveFirebaseData]);

  const filterKelembaban = (data) => {
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
      }
    }

    const updatedChartData = { ...chartKelembaban };
    updatedChartData.datasets[0].data = dataKelembaban;
    setChartKelembaban(updatedChartData);
  }

  const filterSuhu = (data) => {
    const dataSuhu = new Array(24).fill(0);

    if(data !== null){
      for(const key in data){
        let suhu = 0.0;
        let objLength = 0
        for(const x in data[key]){
          const dataPerMenit = parseFloat(data[key][x]['suhu'])
          if(typeof dataPerMenit !== 'undefined' && (isNaN(dataPerMenit)) === false && dataPerMenit !== 0){
            suhu += dataPerMenit
            objLength += 1
          }
        }
        dataSuhu[+key] = isNaN(suhu/objLength) ? 0 : suhu/objLength
      }
    }

    const updatedChartData = { ...chartSuhu };
    updatedChartData.datasets[0].data = dataSuhu;
    setChartSuhu(updatedChartData);
  }

  const filterKecepatanAngin = (data) => {
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
        }
      }
      dataKecepatanAngin[+key] = isNaN(kecAngin/objLength) ? 0 : kecAngin/objLength
    }
  }

    const updatedChartData = { ...chartKecepatanAngin };
    updatedChartData.datasets[0].data = dataKecepatanAngin;
    setChartKecepatanAngin(updatedChartData);
  }

  const filterCurahHujan = (data) => {
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
          }
        }
        dataCurahHujan[+key] = isNaN(curahHujan/objLength) ? 0 : curahHujan/objLength
      }
    }

    const updatedChartData = { ...chartCurahHujan };
    updatedChartData.datasets[0].data = dataCurahHujan;
    setChartCurahHujan(updatedChartData);
  }

  const filterArahAngin = (data) => {
    const dataArahAngin = new Array(24).fill('-');

    if(data !== null){
      for(const key in data){
        const count = {};
        for(const x in data[key]){
          const dataPerMenit = data[key][x]['arah_angin']
          console.log(dataPerMenit)
          if(dataPerMenit !== 'undefined'){
            count[dataPerMenit] = (count[dataPerMenit] || 0) + 1;
          }
        }

        console.log(count)
        let dataTerbanyak;
        let jumlahTerbanyak = 0;
        for (const data in count) {
          if (count[data] > jumlahTerbanyak) {
            jumlahTerbanyak = count[data];
            dataTerbanyak = data;
          }
        }

        dataArahAngin[+key] = dataTerbanyak === 'undefined' ? '-' : dataTerbanyak
      }
    }

    setTableData(dataArahAngin)

  }


  const retriveFirebaseData = (date) =>{
    //Retrive firebase data
    const starCountRef = ref(db, 'C2/' + date);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()){
        const data = snapshot.val();
        filterKelembaban(data)
        filterSuhu(data)
        filterKecepatanAngin(data)
        filterCurahHujan(data)
        filterArahAngin(data)
      }
      else {
        filterKelembaban(null)
        filterSuhu(null)
        filterKecepatanAngin(null)
        filterCurahHujan(null)
        filterArahAngin(null)
      }
    });
  
  }

  // Get current date
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = currentDate.getFullYear();

  // Format the date as "01:30:2023"
  const formattedDate = `${month}:${day}:${year}`;

  
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
                    }}
                  />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    key={JSON.stringify(chartKecepatanAngin)}
                    data={chartKecepatanAngin}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Data rata-rata berdasarkan waktu</h5>
                <CardTitle tag="h2">Kelembaban</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    key={JSON.stringify(chartKelembaban)}
                    data={chartKelembaban}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
            </Col>
          <Col lg="6" md="12">
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
                    key={JSON.stringify(chartCurahHujan)}
                    data={chartCurahHujan}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-chart">
              <CardHeader>
              <h5 className="card-category">Data rata-rata berdasarkan waktu</h5>
                <CardTitle tag="h3">
                  Suhu
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    key={JSON.stringify(chartSuhu)}
                    data={chartSuhu}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Arah Angin</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Jam</th>
                      <th>Arah angin</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    </>
  );
}

export default Dashboard_2;
