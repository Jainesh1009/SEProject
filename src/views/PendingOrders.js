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
import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import emailjs from 'emailjs-com';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import {Button} from '@material-ui/core';
import db from '../firebase';
import {
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
  } from "reactstrap";
function PendingOrders(props) {


    const [orders, setOrders] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [brand, setBrand] = useState([]);
    const [madeIn, setMadeIn] = useState([]);
    const [stock, setStock] = useState([]);
    useEffect(() => {
    db.collection('PendingOrders').onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => ({id:doc.id ,Price:doc.data().Price,Brand:doc.data().Brand,Name:doc.data().Name,Status:doc.data().Status,Stock:doc.data().Stock})))
    })

  }, []);
        // console.log(product)
        // console.log(orders)

const updateOrders = (e) => {
    e.preventDefault()
    
}
  return (
    <>
      <div className="content">
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle tag="h4">Pending Orders</CardTitle>
                </CardHeader>
              <CardBody>
                <Row>

                <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock ordered</th>
                        <th>Order Stauts</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                      <tr>
                        <td>{order.Name}</td>
                        <td>{order.Brand}</td>
                        <td>{order.Price}</td>
                        <td>{order.Stock}</td>
                        {order.Status?<td>pending</td>:<td>delivered</td>}
                        <td><Button  className="ml-1" type="submit"variant="contained" color="primary" onClick={updateOrders}>Order Received</Button></td>
                      </tr>
                    ) )}     
                    </tbody>
                  </Table>
                {/* <Col md='4'>
                <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>

                    <Button onClick={clicked}>pressme</Button>
                    </tbody>
                  </Table>
                </Col> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
}

export default PendingOrders;
