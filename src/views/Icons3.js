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
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import {Button} from '@material-ui/core';
import db from '../firebase'
function Icons3(props) {


    const [product, setProduct] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [brand, setBrand] = useState([]);
    const [madeIn, setMadeIn] = useState([]);
    const [stock, setStock] = useState([]);
    const [stock1, setStock1] = useState([]);
    const [id,setId] = useState();
    useEffect(() => {
        // console.log(props)
        db.firestore().collection('Categories').doc(props.match.params.id1).collection('SubCategories').doc(props.match.params.id2).collection('Products').onSnapshot(snapshot => {
          setProduct(snapshot.docs.map(doc => ({id:doc.id, data:doc.data()})))
        //   console.log(snapshot.docs.map(doc => (doc.data().Sub)))
        //   console.log(props.match.params)
        })
        
        // db.collection('Categories').doc(props.match.params.id1).collection('SubCategories').doc(props.match.params.id2).collection('Products').onSnapshot(snapshot => {
        //     snapshot.docs.map(doc => {
        //       // console.log(doc.data().Id)
        //       db.collection('AllProducts').doc(`${doc.data().Id}`).get().then(snap => {
        //         setStock1(snap.data().Quantity)

        //         console.log(snap.data().Quantity)
        //       })
        //     })
        //     // console.log(snap.data())
        //   })


        // product.map((doc)=>{
        //   console.log("hi")
          // db.collection('AllProducts').doc(`${doc.Id}`).get().then(snap => {
          //   setStock1(snap.data().Quantity)
          //   // console.log(snap.data())
          // })
        // })
        

      },[]);

    const addProduct = (event) => {
        //this will fire up when we click the button
        // console.log('Its working')
        event.preventDefault();//stop refresh
        db.firestore().collection('Categories').doc(props.match.params.id1).collection('SubCategories').doc(props.match.params.id2).collection("Products").add({
          Name : name,
          Brand: brand,
          Price: price,
          MadeIn: madeIn,
          Stock: stock,
          Id: id
        })

        db.firestore().collection('AllProducts').doc(`${id}`).set({
          Name: name,
          Quantity: Number(stock),
          Price: price  
        })
        setStock('')
        setId('');
        setBrand(''); //clear the input
        setName(''); //clear the input
        setPrice(''); //clear the input
        setMadeIn(''); //clear the input
      }

  // const clicked = (e) => {
  //   e.preventDefault();
  //      product.map((doc)=>{
  //         // console.log(doc.data.Id)
  //         db.collection('AllProducts').doc(`${doc.data.Id}`).get().then(snap => {
  //           setStock1(...stock1,snap.data().Quantity)
  //           // console.log(snap.data().Quantity)
  //         })
  //       })
  //       console.log(stock1)
  // }
                    //     {stock1.map(data => (
                    //   <tr>
                    //     <td>{data}</td>
                    //   </tr>
                    // ) )}           

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle tag="h4">Products</CardTitle>
                <form onSubmit={addProduct}>
                  <input  value={name} placeholder="Name Of Product" onChange={event => setName(event.target.value)}
                  required/>
                  <input className="ml-1" value={brand} placeholder="Brand Name" onChange={event => setBrand(event.target.value)}
                  required/>
                   <input className="ml-1" value={price} placeholder="Product Price" onChange={event => setPrice(event.target.value)}
                  required/>
                   <input className="ml-1" value={madeIn} placeholder="Origin of the Product" onChange={event => setMadeIn(event.target.value)}
                  required/>
                   <input className="ml-1" value={stock} type="number" min='1' placeholder="Quantity/Stock" onChange={event => setStock(event.target.value)}
                  required/>
                  <input className="ml-1" value={id} placeholder="identity" onChange={event => setId(event.target.value)}
                  required/>
                  <Button className="ml-1" type="submit"variant="contained" color="primary" >Add Product</Button>
                </form>
                </CardHeader>
              <CardBody>
                <Row>

                <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Made in</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                    {product.map(prod => (
                      <tr>
                        <td>{prod.data.Name}</td>
                        <td>{prod.data.Brand}</td>
                        <td>{prod.data.Price}</td>
                        <td>{prod.data.MadeIn}</td>
                        <td>{prod.data.Stock}</td>

                        <td><Link to= {{
                          pathname: `/admin/icons/${props.match.params.id1}/${props.match.params.id2}/${prod.id}`}}>Order</Link></td>
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
    </>
  );
}

export default Icons3;
