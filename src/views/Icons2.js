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

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import {Button} from '@material-ui/core';
import db from '../firebase'
function Icons2(props) {


    const [subcategory, setSubcategory] = useState([]);
    useEffect(() => {
        // console.log(props.location.id)
        console.log(props.match.params.id)
        db.collection('Categories').doc(props.match.params.id).collection('SubCategories').onSnapshot(snapshot => {
          setSubcategory(snapshot.docs.map(doc => (doc.data().Sub)))
        //   console.log(snapshot.docs.map(doc => (doc.data().Sub)))
          
        })
      },[]);


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle tag="h4">Subcategories</CardTitle>
                </CardHeader>
              <CardBody>
              <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Subcategories</th>
                      <th>No of Products</th>
                      <th>subsection</th>
                    </tr>
                  </thead>
                  <tbody>
                  {subcategory.map(subcat => (
                  <tr>
                    {/* <Subcategories text={subcat}/> */}
                    <td>
                     {subcat} 
                      </td>
                      <td>10</td>
                      <td>5</td>
                 </tr>
                  ) )}
       
                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Icons2;
