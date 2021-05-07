/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./views/Dashboard.js";
import Icons from "./views/Icons.js";
import Icons2 from "./views/Icons2.js";
import Icons3 from "./views/Icons3.js";
import Map from "./views/Map.js";
import Notifications from "./views/Notifications.js";
// import Rtl from "./views/Rtl.js";
import TableList from "./views/TableList.js";
import Typography from "./views/Typography.js";
import UserProfile from "./views/UserProfile.js";
import Category from "./views/Category.js"
import Order from "./views/Order" 
import PendingOrder from "./views/PendingOrders" 
import BillingForm from "./views/BillingForm"
import Additems from "./views/Additems"
import Bill from "./views/Bill"
import Admin from "./components/Admin" 
import BillForm from "./views/BillForm" 

var routes = [
  {
    path:"/billform",
    name:"BillForm",
    icon: "tim-icons icon-atom",
    component: BillForm,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login-SignUp",
    icon: "tim-icons icon-single-02",
    component: Admin,
    layout: "/admin",
  },
  {
    path:"/bill",
    name:"Bill",
    icon: "tim-icons icon-atom",
    component: Bill,
    layout: "/admin"
  },
  {
    path:"/form",
    name:"Billing Form",
    icon: "tim-icons icon-atom",
    component: BillingForm,
    layout: "/admin"
  },
  {
    path:"/additems",
    name:"AddItems",
    icon: "tim-icons icon-atom",
    component: Additems,
    layout: "/admin"
  },
  {
    path:"/icons/:id1/:id2/:id3/pendingOrder",
    name:"PendingOrderPage",
    icon: "tim-icons icon-atom",
    component: PendingOrder,
    layout: "/admin"
  },
  {
    path:"/icons/:id1/:id2/:id3",
    name:"OrderPage",
    icon: "tim-icons icon-atom",
    component: Order,
    layout: "/admin"
  },
  {
    path:"/icons/:id1/:id2",
    name:"Products",
    icon: "tim-icons icon-atom",
    component: Icons3,
    layout: "/admin"
  },
  {
    path:"/icons/:id",
    name:"Subcategories",
    icon: "tim-icons icon-atom",
    component: Icons2,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Warehouses",
    // rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Purchase Order",
    // rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Billing",
    // rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Accounts",
    // rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/icons/category",
    name: "Category",
    // rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: Category,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   // rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   // rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl",
  // },
];
export default routes;
