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
import { Route, Switch, Redirect, useLocation, Link } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "./AdminNavbar.js";
import Footer from "./Footer.js";
import Sidebar from "./Sidebar.js";
import FixedPlugin from "./FixedPlugin.js";
import fire from '../firebase'


import routes from "../routes.js";

//  import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "./BackgroundColorContext";
import Login from "../views/Login.js";
import '../views/Login.css'; 
var ps;

function Admin(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

    // For Login

    const [user,setUser] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [hasAccount, setHasAccount] = React.useState(false)

    const clearInputs = () => {
      setEmail('')
      setPassword('')
    }
  
    const clearErrors = () =>{
      setPasswordError('')
      setEmailError('')
    }
  
    const handleLogin = () => {
      clearErrors()
      fire
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err =>{
          switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message)
              break;
            case "auth/wrong-password":
              setPasswordError(err.message)
              break;
          }
        })
       
    }
  
    const handleSignup = () =>{
      clearErrors()
      fire
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err =>{
          switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message)
              break;
            case "auth/weak-password":
              setPasswordError(err.message)
              break;
          }
        })
      {console.log("hii")}
    }
    
    const handleLogout = () =>{
      // console.log("asas")
      // e.preventDefault()
      fire.auth().signOut()
    }
  
    const handleForgetPassword = () =>{
      clearErrors()
      fire.auth().sendPasswordResetEmail(email).then(()=> {alert("Mail Sent to your mail ID")})
        .catch(err =>{
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message)
            break;
          case "auth/wrong-password":
            setPasswordError(err.message)
            break;
        }
      })
      
    }
  
    const authListener = () =>{
      fire.auth().onAuthStateChanged(user =>{
        if(user){
          clearInputs()
          setUser(user)
        }
        else{
          setUser('')
        }
      })
    }
  React.useEffect(() => {
   
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    authListener()
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
   
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
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
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          {user?(
            
            // <Link to="/admin/dashboard">
            <div className="wrapper">
            <Sidebar
              routes={routes}
              // logo={{
              //   outterLink: "https://www.creative-tim.com/",
              //   text: "Creative Tim",
              // }}
              handleLogout={handleLogout}
              toggleSidebar={toggleSidebar}
            />
          <div className="main-panel" ref={mainPanelRef} data={color}>
          {console.log(props.user)}
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              setsidebarOpened={setsidebarOpened}
              handleLogout={handleLogout}
              user={props.user}
            />
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/admin/dashboard" />
            </Switch>
            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
          </div>
          // </Link>
          )
          :(
            <div  ref={mainPanelRef} data={color}>
            {/* {console.log(props.user)}
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                setsidebarOpened={setsidebarOpened}
                handleLogout={handleLogout}
                user={props.user}
              />
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              } */}
              {console.log("in lgi")}
          <Login 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          handleForgetPassword={handleForgetPassword}
          user={user}
        
      />
              
            </div>
            
          )}





          <div className="wrapper">
            
          {/* {!props.user?(
        // <Admin handleLogout={handleLogout} user={user} />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                setsidebarOpened={setsidebarOpened}
                handleLogout={handleLogout}
              />
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          ):(
            {/* <div> */}
            {/* <Sidebar
              routes={routes}
              // logo={{
              //   outterLink: "https://www.creative-tim.com/",
              //   text: "Creative Tim",
              // }}
              toggleSidebar={toggleSidebar}
            /> */}
            
          {/* <div className="main-panel" ref={mainPanelRef} data={color}>
          {console.log(props.user)}
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              setsidebarOpened={setsidebarOpened}
              handleLogout={handleLogout}
              user={props.user}
            />
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/admin/dashboard" />
            </Switch>
            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div> */}
        {/* </div> */}
          





           </div> 
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
