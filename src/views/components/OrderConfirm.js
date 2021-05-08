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
import db from '../../firebase';
import UpdateData from './UpdateData'
import {
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
  } from "reactstrap";
function OrderConfirm({order,id1,id2,id3}) {


    const [orders, setOrders] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [brand, setBrand] = useState([]);
    const [madeIn, setMadeIn] = useState([]);
    const [stock, setStock] = useState([]);
    const [quantity, setQuantity] = useState([]);
    useEffect(() => {
    db.firestore().collection('PendingOrdersA').onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => ({id:doc.id ,Price:doc.data().Price,Brand:doc.data().Brand,Name:doc.data().Name,Status:doc.data().Status,Stock:doc.data().Stock,id1:doc.data().Id1,id2:doc.data().Id2})))
    })

  }, []);
        // console.log(product)
        // console.log(orders)

// const updateOrders = (stock) => (e) => {
  const updateOrders = (e) => {
    console.log(order.id,order.id1,order.id2)
    e.preventDefault();
    var fquant=0;
    db.firestore().collection('Categories').doc(order.id1).collection('SubCategories').doc(order.id2).collection('Products').doc(order.id).get()
    .then(snapshot => 
        {setQuantity(snapshot.data().Stock)})
    console.log(Number(order.Stock),Number(quantity))
        var fquant = Number(order.Stock)+Number(quantity)
    db.firestore().collection('Categories').doc(order.id1).collection('SubCategories').doc(order.id2).collection('Products').
    doc(order.id).set({
      Stock :  fquant,
    },{merge : true})

    db.firestore().collection('PendingOrdersA').doc(order.id).set({
        Status: false
    },{merge : true})
}
  return (
    <>
      <tr>
            <td>{order.Name}</td>
            <td>{order.Brand}</td>
            <td>{order.Price}</td>
            <td>{order.Stock}</td>
            <td>{order.Date}</td>
                {order.Status?<><td>pending</td>
            <td><Button  className="ml-1" type="submit"variant="contained" color="primary" onClick={updateOrders}>Order Received</Button></td></>
                :<><td>delivered</td>
            <td><Button  disabled className="ml-1" type="submit"variant="contained" color="secondary" onClick={updateOrders}>Order Received</Button></td></>}
     </tr>
     
    </>
  );
}

export default OrderConfirm;
