import React from 'react'
import {Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import db from '../../firebase'
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import routes from '../../routes'
import {Link} from 'react-router-dom'
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Categories(props) {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
          if (prop.layout === "/admin") {
            // console.log("-------------------------------------")  
            // console.log(prop.component)
            // console.log(prop.layout + prop.path)
            return (   
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };
    const catpage = (event) => {
        console.log(event)
        return (
            <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/Admin/icons/category" />
            </Switch>
        )
    }
    // const deleteCategory = (event) => {
    //     db.collection('Categories').doc(props.text.id).delete()
    // }
    return (
        <div>       
            <CancelIcon onClick={event => db.collection('Categories').doc(props.text.id).delete()}/>
            <Link to={{
              pathname: `/admin/icons/${props.text.id}`,
              id: props.text.id
            }} >
            <div className="font-icon-detail">                
                {/* <i class="fas fa-solar-panel"></i> */}
                {/* <i class="fas fa-tv"></i> */}
                <p>{props.text.Category}</p>    
                {/* <Button variant="contained"color="primary" onClick={catpage}>Visit</Button>                  */}
            </div>
            </Link>          
        </div>
    )
}

export default Categories
