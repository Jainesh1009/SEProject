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
  Row,
  Col,
} from "reactstrap";

function UserProfile() {
    const [name,setName] = useState('');
    const [company,setCompany] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [code,setCode] = useState('');
    const [button,setButton] = useState(true)

    const navStyle = {
        color:'white'
    };

    const addCustomer = (event) => {
      setButton(false)
        //this will fire up when we click the button
        // console.log('Its working')
        event.preventDefault();//stop refresh
        db.firestore().collection('Customer').add({
          Address : address,
          Company : company,
          Name : name,
          Phone : phone,
          Email : email,
          Pincode : code
        })
      
        // setName(''); //clear the input
        // setCompany(''); //clear the input
        // setAddress(''); //clear the input
        // setPhone(''); //clear the input
        // setEmail(''); //clear the input
        // setCode(''); //clear the input
      }

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
                <Form onSubmit={addCustomer}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Company Name</label>
                        <Input
                          placeholder="Enter the Company Name"
                          type="text"
                          value={company}
                          onChange={event => setCompany(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="9">
                      <FormGroup>
                        <label>Customer Name</label>
                        <Input
                          required
                          placeholder="Name"
                          type="text"
                          value={name}
                          onChange={event => setName(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="4">
                      <FormGroup>
                        <label>Phone Number</label>
                        <Input
                          required
                          placeholder="Phone Number"
                          type="text"
                          value={phone}
                          onChange={event => setPhone(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input 
                        required
                        placeholder="Email" 
                        type="email" 
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="9">
                      <FormGroup>
                        <label>Address of the Company</label>
                        <Input                          
                          placeholder="Address"
                          type="text"
                          value={address}
                          onChange={event => setAddress(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input
                          placeholder="Zip Code"
                          type="text"
                          value={code}
                          onChange={event => setCode(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  {button ? <h1></h1> : <h4>Customer Added go to Add Items</h4>}
                  </Row>
                  
                  <Row>
                  {button ? <Button type="submit" color='info'>Add Customer</Button> : 
                  <Link
                      // onClick={setButton(!button)}                   
                      style={navStyle} 
                      to={{
                        pathname:"/admin/additems",
                        name:{name},
                        phone:{phone},
                        email:{email}
                      }}
                      >
                    <Button className="btn-fill" color="primary"  >                
                        Add Items                                   
                    </Button>
                  </Link> 
                  }
                  </Row>

                </Form>
              </CardBody>

              <CardFooter>
              {/* onClick={addCategory} */}
 

              </CardFooter>
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

export default UserProfile;
