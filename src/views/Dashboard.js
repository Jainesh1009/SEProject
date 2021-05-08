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
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import fire from '../firebase'
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../charts.js";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [products, setProducts] = React.useState([]);
  const [quants,setQuants] = React.useState([]);
  const [name,setName] = React.useState([]);
  const [count,setCount] = React.useState(0);
  const [data,setData]=React.useState([]);
  const [odars,setOdars]=React.useState([]);
  const [tp,setTp]=React.useState([]);
  const [tp1,setTp1]=React.useState([]);
  const [employee,setEmployee]=React.useState([]);
  const [stp,setSTp]=React.useState([]);
  const [stp1,setSTp1]=React.useState([]);
  const [ttp,setTTp]=React.useState([]);
  const [ttp1,setTTp1]=React.useState([]);

  const [pData,setPData]=React.useState([]);
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const arr1=[]
  const arr2=[]
  const parr1=[]
  const parr2=[]
  const turn1=[]
  const turn2=[]


  const AddEmploye=()=>{
    fire.firestore().collection('Employees').onSnapshot(snapshot => {
        setEmployee(snapshot.docs.map(doc => (doc.data())))})
    }
    const calcTurn =()=>{
      for (var i = 0; i<tp.length;i++){
        console.log(tp[i],stp[i])
        turn1[i]=Number(tp[i])-Number(stp[i])
        turn2[i]=tp1[i]
      }
      console.log(turn1)
      console.log(turn2)
      setTTp(turn1)
      setTTp1(turn2)
  
      AddData()
      // console.log(stp)
      // console.log(stp1)
    }
const AddpData = () =>{
  fire.firestore().collection('PendingOrdersA').onSnapshot(snapshot => {
    setPData(snapshot.docs.map(doc => (doc.data())))})





const flag=[]
flag[0]=false
for(var i =0;i<pData.length-1;i++){
var x=Number(pData[i].Price)
for(var j=i+1;j<pData.length;j++){
  if(pData[i].Date==pData[j].Date)
  {
    x=x+Number(pData[j].Price)
    flag[j]=true
  }
}
if(!flag[i])
{

  parr1.push(x)
  parr2.push(pData[i].Date)
}


}
console.log(parr1)
console.log(parr2)
var list = [];
for (var j = 0; j < parr1.length; j++) 
list.push({'Price': parr1[j], 'Date': parr2[j]});
list.sort(function(a, b) {
  return ((a.Date < b.Date) ? -1 : ((a.Date == b.Date) ? 0 : 1));
});
for (var k = 0; k < list.length; k++) {
    parr1[k] = list[k].Price;
    parr2[k] = list[k].Date;
}
    setSTp(parr1)
    setSTp1(parr2)
console.log(parr1)
console.log(parr2)

calcTurn()
}
  const AddData = () =>{
    fire.firestore().collection('OrdersA').onSnapshot(snapshot => {
      setOdars(snapshot.docs.map(doc => (doc.data())))})



const flag=[]
flag[0]=false
for(var i =0;i<odars.length-1;i++){
  var x=odars[i].Total_Price
  for(var j=i+1;j<odars.length;j++){
    if(odars[i].Date==odars[j].Date)
    {
      x=x+odars[j].Total_Price
      flag[j]=true
    }
  }
  if(!flag[i])
 {

    arr1.push(x)
    arr2.push(odars[i].Date)
  }
  
  
}
console.log(arr1)
console.log(arr2)
var list = [];
for (var j = 0; j < arr1.length; j++) 
  list.push({'Price': arr1[j], 'Date': arr2[j]});
list.sort(function(a, b) {
    return ((a.Date < b.Date) ? -1 : ((a.Date == b.Date) ? 0 : 1));
  });
for (var k = 0; k < list.length; k++) {
      arr1[k] = list[k].Price;
      arr2[k] = list[k].Date;
  }
  setTp(arr1)
  setTp1(arr2)
// console.log(tp[0])

  }

      //Sort could be modified to, for example, sort on the age 
      // if the name is the same.
  
  React.useEffect(() => {
    // fire.firestore().collection('Orders').onSnapshot(snapshot => {
    //   setProducts(snapshot.docs.map(doc => (doc.data().Total_Price)))
    //   // setProducts(arr=>[...arr,snapshot.docs.map(doc => (doc.data().Total_Price))])
    // })
    fire.firestore().collection('AllProducts').onSnapshot(snapshot => {
      setQuants(snapshot.docs.map(doc => (doc.data().Quantity)))})
    fire.firestore().collection('AllProducts').onSnapshot(snapshot => {
        setName(snapshot.docs.map(doc => (doc.data().Name)))})
    fire.firestore().collection('AllProducts').onSnapshot(snapshot => {
          setData(snapshot.docs.map(doc => (doc.data())))})
          // AddData()
          AddpData()
          calcTurn()
          AddEmploye()
      // setProducts(arr=>[...arr,snapshot.docs.map(doc => (doc.data().Total_Price))]
      // console.log("hello")
      // console.log(quants.length)

    //  for(var i=0;i<quants.length;i++){
    //   setCount(count+quants[i])
    //   // console.log(quants[i])
    //  }
    //  console.log(count)

  },[])
  
  
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
          <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    {/* <h5 className="card-category">Total Shipments</h5> */}
                    <CardTitle tag="h2">Turnover</CardTitle>
                  </Col>
                  <Col sm="6">
                  <Button onClick={AddpData}>
                    Show Data
                  </Button>
                      {/* <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button> */}
                    
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Line
                    data={{
                      labels: [ttp1[0],ttp1[1],ttp1[2],ttp1[3]],
                      datasets:[
                        {
                          label: "Price",
                          data:[ttp[0],ttp[1],ttp[2],ttp[3]],
                          backgroundColor:'pink'
                        }
                      ]
                    }}
                    options={{
                      maintainAspectRatio :false
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Stock</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={{
                      labels: [name[0],name[1],name[2],name[3],name[4]],
                      datasets:[
                        {
                          label: "Quantity",
                          data:[quants[0],quants[1],quants[2],quants[3],quants[4]],
                          backgroundColor:'#9A9A9A'
                        }
                      ]
                    }}
                    options={{
                      maintainAspectRatio :false
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
               
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  
                  <Line
                    data={{
                      labels: [tp1[0],tp1[1],tp1[2],tp1[3]],
                      datasets:[
                        {
                          label: "Price",
                          data:[tp[0],tp[1],tp[2],tp[3]],
                          backgroundColor:'#9A9A9A'
                        }
                      ]
                    }}
                    options={{
                      maintainAspectRatio :false
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row>
        <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Under-Stock Products</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <tr>
                      <td>
                      {data.map(doc=>(
                        doc.Quantity<10?(<tr>{doc.Name}</tr>):
                      (<h1></h1>)
                      ))}
                      </td>
                      <td>
                      {data.map(doc=>(
                        doc.Quantity<10?(<tr>{doc.Quantity}</tr>):
                        (<h1></h1>)
                      ))}
                      </td>
                    </tr>
                  
        

                    
                  
                    {/* <td>
                      {quants.map(doc=>(doc>10?("Available"):("Under-Stock")))}
                    </td> */}
                    
                           
                  </tbody>
                </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6">
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Employees Data</h5>
                <CardTitle tag="h3">
                <i className="tim-icons icon-send text-success" />
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>
                      {employee.map(doc=>(
                        <tr>{doc.Name}</tr>
                      ))}
                      </td>
                      <td>
                      {employee.map(doc=>(
                        <tr>{doc.Role}</tr>

                      ))}
                      </td>
                      <td>
                      {employee.map(doc=>(
                        <tr>{doc.Salary}</tr>

                      ))}
                      </td>

                    </tr>





                    {/* <td>
                      {quants.map(doc=>(doc>10?("Available"):("Under-Stock")))}
                    </td> */}


                  </tbody>
                </Table>
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
