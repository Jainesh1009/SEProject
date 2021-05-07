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
import {Button, Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
// import {Button} from '@material-ui/core';
import db from '../firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
function Icons2(props) {


    const [subcategory, setSubcategory] = useState([]);
    const [input1,setInput1] = useState('');
    const [input2,setInput2] = useState('');
    const [input3,setInput3] = useState('');
    const [input4,setInput4] = useState('');
    const [dealers,setDealers] = useState('');
    const [form2, setForm2] = useState(false);
    const [button1, setButton1] = useState(true);
    useEffect(() => {
        // console.log(props.location.id)
        console.log(props.match.params.id)
        db.firestore().collection('Categories').doc(props.match.params.id).collection('SubCategories').onSnapshot(snapshot => {
          setSubcategory(snapshot.docs.map(doc => ({id:doc.id, subcatdata:doc.data()})))
        //   console.log(snapshot.docs.map(doc => (doc.data().Sub)))
          
        })

        
      },[]);

      const addSubCategory = (event) => {
        //this will fire up when we click the button
        // console.log('Its working')
        event.preventDefault();//stop refresh
        db.firestore().collection('Categories').doc(props.match.params.id).collection('SubCategories').add({
          Sub : input1,
          W_subsection: input2
        })
      
        setInput1(''); //clear the input
        setInput2(''); //clear the input
      }
const setDealer = (e) => {
  e.preventDefault()
  db.firestore().collection('Dealers').doc(props.match.params.id).set({
    Name: input3,
    Email: input4
  })
  setButton1(false)
}
const fetchDealer = (e) => {
  e.preventDefault()
  // var x = db.firestore().collection("Dealers").doc(props.match.params.id).get()
  // {x?(db.firestore().collection("Dealers").doc(props.match.params.id).get().then(snap => setDealers(snap.data()))):(setForm2(true))}
  setForm2(true)
}

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle tag="h4">Subcategories</CardTitle>
                <form onSubmit={addSubCategory}>
                  <input className="ml-1" value={input1} placeholder="Subcategory Type" onChange={event => setInput1(event.target.value)}
                  required/>
                  <input className="ml-1" value={input2} placeholder="Subsection" onChange={event => setInput2(event.target.value)}
                  required/>
                  <Button className="ml-1" type="submit"variant="contained" color="success" >Add Sub-Category</Button>
                </form>
                {form2?<form onSubmit={setDealer}>
                  <input className="ml-1" defaultValue={dealers.Name} value={input3} placeholder={dealers.Name} onChange={event => setInput3(event.target.value)}
                  />
                  <input className="ml-1" defaultValue={dealers.Email} value={input4} placeholder={dealers.Email} onChange={event => setInput4(event.target.value)}
                  />
                  {button1?<Button className="ml-1" type="submit"variant="contained" color="info" >Set Dealer</Button>:
                  <Button disabled className="ml-1" type="submit"variant="contained" color="info" >Set Dealer</Button>}
                </form>:
                <Button className="ml-1" onClick={fetchDealer} variant="contained" color="info" >Dealer Details</Button>
                }
                
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
            <td><DeleteForeverIcon onClick={event => db.firestore().collection('Categories').doc(props.match.params.id).collection('SubCategories').doc(subcat.id).delete()}/></td>
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
