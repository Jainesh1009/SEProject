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
import {useState,useEffect} from "react";
import db from '../firebase'
import {Link} from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";

function Bill(props) {

    const [products,setProducts] = useState([])
    const [price,setPrice] = useState([])
    const [total,setTotal] = useState()
    const [button,setButton] = useState(true)
    const [button2,setButton2] = useState(true)
    // const [date,setDate] = useState(Date().toLocaleString())

    const usefunction = () => {
      console.log(props.location)
        db.firestore().collection('Temp').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => (doc.data())))
          })
    }
    const displaybill = () => {

        setButton(false)
        var pr = 0
        products.map(k => {
            var te = db.firestore().collection('AllProducts').doc(`${k.Id}`);
            te.get().then(doc => {
            pr = pr + (k.Quantity*doc.data().Price)
            setTotal(pr)
            setPrice(arr => [...arr,doc.data().Price])
            // arr.push(doc.data().Price)    
            })
            // price.map(data => {
            //     console.log(data)
            // }) 
          })


    }

    // Send Email and stores the data
    const storeorder = (e) => {
      setButton2(false)
      // setDate(Date().toLocaleString)
      console.log("Submited")
      // console.log(date)

      // Deleting the Temp dataset
      // db.collection('Temp').delete()
      var today = new Date(),
      date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      // setDate(date1);
      console.log(date1)

      db.firestore().collection('OrdersA').add({
        Name : props.location.name,
        Email :props.location.email,
        Phone : props.location.phone,
        Total_Price : Number(total),
        Date : date1
      })
    }


    useEffect(() => {
        usefunction()
      },[])
    
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Bill</h5>
                {button ?  <Button color='primary' onClick={displaybill}>Show the Bill</Button> : 
                 <Button disabled color='primary' onClick={displaybill}>Show the Bill</Button> }                       
              </CardHeader>
              <CardBody>
                <Row>
                  <h4>Name of the Customer : {props.location.name}</h4>         
                </Row>
                <Row>
                  <h4>Email Address : {props.location.email}</h4>         
                </Row>
                <Row>
                  <h4>Phone Number : {props.location.phone}</h4>         
                </Row>
                  <Row>
                      <Col md = '8'>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>
                            <th>Product Id</th>
                            <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                                {products.map(subcat => (
                                    <tr>
                                        {/* <Subcategories text={subcat}/> */}
                                        <td>{subcat.Id}</td>
                                        <td>{subcat.Quantity}</td>
                                    </tr>
                                ))}                                        
                        </tbody>
                      </Table>  
                      </Col>
                      <Col md='4'>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>                            
                            <th>Price (in Rs)</th>
                            </tr>
                        </thead>
                        <tbody>
                          {price.map(data => (
                              <tr>
                                  <td>{data}</td>
                              </tr>
                          ))}                                      
                        </tbody>
                    </Table>                                  
                      </Col>
                  </Row>
                  <Row>
                      <Col md='8'>
                            <h3>Total Price</h3>
                      </Col>
                      <Col md='4'>
                          <h3>{total}</h3>
                      </Col>                      
                  </Row>

                  <Row>
                  {button2 ? <h1></h1> : <h4> ..Payment Done</h4>}  
                  </Row>          
                  <Row>                    
                    {button2 ?  <Button  onClick={storeorder} >Complete Payment</Button> : 
                    <Link to={{
                      pathname:"/admin/billform",
                      name:props.location.name,
                      phone:props.location.phone,
                      email:props.location.email
                    }}>
                      <Button color="info">
                        Generate Invoice
                      </Button>
                    </Link>}             
                  </Row>
              
              </CardBody>
            </Card>
            {/* This is the button */}
            {/* Here the Form Ends */}
          </Col>
          {/* Here the second card starts */}
        </Row>
      </div>
    </>
  );
}

export default Bill;
