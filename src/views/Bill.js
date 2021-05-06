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

    const usefunction = () => {
      console.log(props.location)
        db.collection('Temp').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => (doc.data())))
          })
    }
    const usefunction2 = () => {

        setButton(false)
        var pr = 0
        products.map(k => {
            var te = db.collection('AllProducts').doc(`${k.Id}`);
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
                {button ?  <Button color='warning' onClick={usefunction2}>Show the Bill</Button> : 
                 <Button disabled color='danger' onClick={usefunction2}>Show the Bill</Button> }                       
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
                            <th>Price</th>
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
