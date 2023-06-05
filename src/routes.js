/* eslint-disable react/jsx-pascal-case */
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
import Dashboard from "views/Dashboard.js";
import Dashboard_2 from "views/Dashboard_2.js";

var routes = [
  {
    path: "/lora_1",
    name: "Lora 1",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/lora_2",
    name: "Lora 2",
    rtlName: "الرموز",
    icon: "tim-icons icon-chart-bar-32",
    component: <Dashboard_2 />,
    layout: "/admin",
  },
];
export default routes;
