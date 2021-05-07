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
import Categories from "./components/Categories"

// reactstrap components
import {Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
// import {Button} from '@material-ui/core';
import db from '../firebase'
function Icons() {
  const [category,setCategory] = useState([]);
  const [input,setInput] = useState('');
  // const addCategory = () =>{

  // }
  useEffect(() => {
    //this code fires when the app.js loads
    // snapshot.docs.map(doc => doc.data()) this line will give the array of objects
    // adding .todo will give us the array of string directly.
    db.firestore().collection('Categories').onSnapshot(snapshot => {
      setCategory(snapshot.docs.map(doc => ({id:doc.id, Category:doc.data().Category})))
    })
  }, []);

  const addCategory = (event) => {
    //this will fire up when we click the button
    // console.log('Its working')
    event.preventDefault();//stop refresh
    db.firestore().collection('Categories').add({
      Category : input,
    })
  
    setInput(''); //clear the input
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <form onSubmit={addCategory}>
                <h5 className="title">Categories</h5>
                <input value={input} onChange={event => setInput(event.target.value)}
                required/>
                <Button type="submit"variant="contained" color="info" >Add Category</Button>
                </form>
              </CardHeader>
              <CardBody>
                <Row>
                  {category.map(cat => (
                   <Col
                   className="font-icon-list col-xs-5 col-xs-5"
                   lg="2"
                   md="3"
                   sm="4"
                 >
                  
                 <Categories text={cat}/>

                 </Col>
                  ) )}

           
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Icons;
