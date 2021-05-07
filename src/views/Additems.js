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
  Table,
} from "reactstrap";

function Additems(props) {
  const [products,setProducts] = useState([])
  const [temp2,setTemp2] = useState([])
  const [id,setId] = useState()
  const [quantity,setQuantity] = useState()
  const [temp,setTemp] = useState([])
  const [button,setButton] = useState(false)
  
  const AddProduct = (event) => {
    event.preventDefault()
    db.firestore().collection('Temp').doc(id).set({
      Id:id,
      Quantity : quantity
    })

    setId('')// clear the input
    setQuantity('')// clear the input
  }
  // var quant
  const OnPurchase = (event) => {
    setButton(true)
    event.preventDefault()

    // var te = db.collection('AllProducts').doc('1');
    // te.get().then(doc => {
    //   console.log(doc.data().Quantity)
    // })
    products.map(k => {
      console.log(k.Id)
      var te = db.firestore().collection('AllProducts').doc(`${k.Id}`);
      te.get().then(doc => {
        console.log(doc.data().Quantity)
       var quant = doc.data().Quantity
       var q = k.Quantity;       
       db.firestore().collection('AllProducts').doc(`${k.Id}`).set({
        Quantity : quant-q
      },
      {merge : true}
      )
      })

      // deleting individual document
      // db.collection('Temp').doc(`${k.Id}`).delete()  
    })
  }

  // const OnPurchase = (event) => {
  //   event.preventDefault()
  //   // temp2.map(doc => {
  //   //   db.firestore().collection('AllProducts').doc(doc.Id).get().then(snapshot => setTemp(snapshot.data()))
  //   // // console.log(db.collection('AllProducts').doc('1').get())
  //   //   console.log(temp.Quantity)
  //   //   console.log(doc.Id)
  //   //   // setTemp([''])
  //   // })


  // }
  
  useEffect(() => {
    console.log(props.location)
    db.firestore().collection('Temp').onSnapshot(snapshot => {
      setProducts(snapshot.docs.map(doc => (doc.data())))
    })
    // db.collection('Temp').onSnapshot(snapshot => {
    //   setTemp2(snapshot.docs.map(doc => (doc.data())))
    // })
    // [] indicates it runs once after initial rendering
  },[])

const navStyle = {
    color:'white'
};
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Generating the Bill</h5>
                {button ? <Button className="btn-fill" 
                disabled
                color="warning" 
                type="submit"
                // onClick={AddProduct}
                >
                  Add Item
                </Button> : <Button className="btn-fill" 
                color="warning" 
                type="submit"
                onClick={AddProduct}
                >
                  Add Item
                </Button>}
                
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Enter the Product Id</label>
                        <Input
                          placeholder="Id"
                          type="number"
                          value={id}
                          onChange={e => setId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Total Quantity of the Product</label>
                        <Input
                          placeholder="Quantity"
                          type="number"
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
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
                    {/* <td>{props.location.name}</td> */}
                 </tr>
                  ) )}                         
                  </tbody>
                </Table>  
                  </Row>

                {button ? <Link 
                  style={navStyle} 
                  to={{
                    pathname:"/admin/bill",
                    name:props.location.name.name,
                    phone:props.location.phone.phone,
                    email:props.location.email.email
                  }}>
                    <Button 
                      className="btn-fill" 
                      color="primary" 
                      type="submit"
                      // onSubmit={OnPurchase}
                    > 
                    Generate Invoice                 
                  </Button>
                </Link> : <Button color ="success" onClick={OnPurchase}>
                      Purchase
                  </Button> }    

                
                  
              
                </Form>
              </CardBody>

              <CardFooter>
                
              </CardFooter>
            </Card>
            {/* This is the button */}
            {/* Here the Form Ends */}
          </Col>
          {/* Here the second card starts */}
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
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
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

export default Additems;
