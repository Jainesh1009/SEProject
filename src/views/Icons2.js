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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
function Icons2(props) {


    const [subcategory, setSubcategory] = useState([]);
    const [input1,setInput1] = useState('');
    const [input2,setInput2] = useState('');
    useEffect(() => {
        // console.log(props.location.id)
        console.log(props.match.params.id)
        db.collection('Categories').doc(props.match.params.id).collection('SubCategories').onSnapshot(snapshot => {
          setSubcategory(snapshot.docs.map(doc => ({id:doc.id, subcatdata:doc.data()})))
        //   console.log(snapshot.docs.map(doc => (doc.data().Sub)))
          
        })
      },[]);

      const addSubCategory = (event) => {
        //this will fire up when we click the button
        // console.log('Its working')
        event.preventDefault();//stop refresh
        db.collection('Categories').doc(props.match.params.id).collection('SubCategories').add({
          Sub : input1,
          W_subsection: input2
        })
      
        setInput1(''); //clear the input
        setInput2(''); //clear the input
      }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle tag="h4">Subcategories</CardTitle>
                <form>
                  <input className="ml-1" value={input1} placeholder="Subcategory Type" onChange={event => setInput1(event.target.value)}
                  />
                  <input className="ml-1" value={input2} placeholder="Subsection" onChange={event => setInput2(event.target.value)}
                  />
                  <Button className="ml-1" type="submit"variant="contained" color="primary" onClick={addSubCategory}>Add Sub-Category</Button>
                </form>
                </CardHeader>
              <CardBody>
              <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Subcategories</th>
                      <th>subsection</th>
                    </tr>
                  </thead>
                  <tbody>
                  {subcategory.map(subcat => (
                  <tr>
                    {/* <Subcategories text={subcat}/> */}
                    <td>
                     {subcat.subcatdata.Sub} 
                      </td>
                      <td>{subcat.subcatdata.W_subsection}</td>
                      
                      <td><Link to={{
              pathname: `/admin/icons/${props.match.params.id}/${subcat.id}`,
              // id: subcat.id,
              // prev: props.match.params.id
            }}
            params={{ prev: props.match.params.id }}
            >Visit</Link></td>
            <td><DeleteForeverIcon onClick={event => db.collection('Categories').doc(props.match.params.id).collection('SubCategories').doc(subcat.id).delete()}/></td>
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
