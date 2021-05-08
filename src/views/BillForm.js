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
import emailjs from 'emailjs-com';
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
  Row,
  Table,
  Col,
} from "reactstrap";

function BillForm(props) {
    const [name,setName] = useState([]);
    const [products,setProducts] = useState([])
    const [price,setPrice] = useState([])
    const [total,setTotal] = useState()
    const [state,setState] = useState(true)
    const [button,setButton] = useState(true)
    const [state2,setState2] = useState(false)

    const navStyle = {
        color:'white'
    };

    const displaybill = () => {
        setButton(false)
        var pr = 0
        products.map(k => {
            var te = db.firestore().collection('AllProducts').doc(`${k.Id}`);
            te.get().then(doc => {
            pr = pr + (k.Quantity*doc.data().Price)
            setTotal(pr)
            setPrice(arr => [...arr,doc.data().Price])
            setName(arr2 => [...arr2,doc.data().Name] )    
            })
          })
    }

    const SendBill = (e) => {
        
        products.map((k) => {
            //   Deleting individual components  
            db.firestore().collection('Temp').doc(`${k.Id}`).delete()
          })
          // e.target.reset();
        console.log("asdd")
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        console.log("asdasd")
         emailjs.sendForm('service_dd769zo', 'template_1w9cno8', e.target, 'user_C1MGdzPNZhnTRhT7VKmAo')
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
          setButton(!button)

          alert("Email Sent Successfully")
    }

    const changestate = () => {
        setState2(false)
    }

useEffect(() => {
    // displaybill()
            // Take the data from the Temp db
            db.firestore().collection('Temp').onSnapshot(snapshot => {
                setProducts(snapshot.docs.map(doc => (doc.data())))
              })
},[])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Customer Details</h5>
              </CardHeader>
              <CardBody>

         
                <Form onSubmit={SendBill}>
                    <Row>
                        {button ? <Button color='success' onClick={displaybill}>Generate Bill</Button> : 
                        <Button disabled color='success' onClick={displaybill}>Generate Bill</Button>}
                        
                    </Row>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          
                          defaultValue="Harsh"
                        //   placeholder="Enter the Company Name"
                          type="text"
                          name = "name"
                        //   onChange={event => setCompany(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col md="4">
                      <FormGroup>
                        <label>Phone Number</label>
                        <Input
                        
                          defaultValue={props.location.phone}
                        //   placeholder="Phone Number"
                          name = "phone"
                          type="text"
  
                        //   onChange={event => setPhone(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input                         
                        // placeholder="Email" 
                        name="email"
                        type="text" 
                        value={props.location.email}
                        defaultValue={props.location.email}
                        // onChange={event => setEmail(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>                      
                      <Col md='4'>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>
                            <th>Product Name</th>
                            </tr>
                        </thead>
                        <tbody>
                                {name.map(subcat => (
                                    <tr>
                                        {/* <Subcategories text={subcat}/> */}
                                        <td><Input 
                                        
                                            // placeholder="Email" 
                                            type="text" 
                                            name="pname"

                                            defaultValue={subcat}
                                            // onChange={event => setEmail(event.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}                                        
                        </tbody>
                      </Table> 
                      </Col>

                      <Col md='4'>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>
                            <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                                {products.map(subcat => (
                                    <tr>
                                        {/* <Subcategories text={subcat}/> */}
                                        <td><Input 
                                        
                                            // placeholder="Email" 
                                            name = "quantity"
                                            type="text" 
                                            name="quantity"

                                            defaultValue={subcat.Quantity}
                                            // onChange={event => setEmail(event.target.value)}
                                            />
                                        </td>
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
                                {price.map(subcat => (
                                    <tr>
                                        {/* <Subcategories text={subcat}/> */}
                                        <td><Input 
                                        
                                            // placeholder="Email" 
                                            type="text" 
                                            name="price"

                                            defaultValue={subcat}
                                            // onChange={event => setEmail(event.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}                                        
                        </tbody>
                      </Table> 
                      </Col>

                  </Row>

                  <Row>
                      <Col md='8'>
                            <h4>Total Bill Amount</h4>            
                      </Col>
                      <Col md='4'>
                      <Input 
                        
                        type="text" 
                         name="total"

                         defaultValue={total}
                                            // onChange={event => setEmail(event.target.value)}
                         />
                      </Col>
                  </Row>

                  <Row>
                  {/* <input type="submit" value="Send"/> */}
  
                    <Button color='success' type="submit">                        
                        Send Email To the Customer                        
                    </Button>    
                  </Row>
                </Form> 
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

export default BillForm;
