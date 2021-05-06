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
function PendingOrder(props) {


    const [product, setProduct] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [brand, setBrand] = useState([]);
    const [madeIn, setMadeIn] = useState([]);
    const [stock, setStock] = useState([]);
    useEffect(() => {
        // console.log(props)
        db.collection('Categories').doc(props.match.params.id1).collection('SubCategories').doc(props.match.params.id2).collection('Products').doc(props.match.params.id3).get()
        .then(snapshot => 
          setProduct(snapshot.data())
        //   console.log(snapshot.docs.map(doc => (doc.data().Sub)))
        //   console.log(props.match.params)
        )
        // console.log(product)
      },[]);

      function sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        console.log("asdasd")
         emailjs.sendForm('service_dd769zo', 'template_m4vjk7a', e.target, 'user_C1MGdzPNZhnTRhT7VKmAo')
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
          // e.target.reset();
          return (
            <>
              <h1>Order Placed</h1>
            </>
          )
      }

  return (
    <>
      <div className="content">
      <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Order Details</h5>
              </CardHeader>
              <CardBody>
                <Form className="contact-form" onSubmit={sendEmail}>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Dealer Name</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                          name="Dname"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                         Dealer's Email address
                        </label>
                        <Input placeholder="kashishshah1411@gmail.com" defaultValue="kashishshah1411@gmail.com" type="email" name="email"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Warehouse Address</label>
                        <Input
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                          name="address"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Ahmedabad"
                          placeholder="City"
                          type="text"
                          name="city"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal code</label>
                        <Input placeholder="ZIP Code" type="number" defaultValue="12345" name="pcode"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <label>Product</label>
                        <Input
                          defaultValue={product.Name}
                          type="text"
                          name="pname"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Stock</label>
                        <Input
                          defaultValue={product.Stock}
                          type="text"
                          name="stock"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Link to= {{
                          pathname: `/admin/icons/${props.match.params.id1}/${props.match.params.id2}/${props.match.params.id3}/pendingOrder`}}>
                    <Button className="btn-fill" variant="contained" color="primary" type="submit">
                    Order
                  </Button>
                </Link>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("../img/emilyz.jpg").default}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Dealer</p>
                </div>
                <div className="card-description">
                    Dealer for this product.
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PendingOrder;