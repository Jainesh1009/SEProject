import { Link } from "react-router-dom"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "../components/Admin";
import AdminNavbar from "../components/AdminNavbar";

const Login =(props)=>{
    
    const { email,
    setEmail,
    password ,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    handleForgetPassword,
    user
  } = props
    
    // const renderForget = () =>{
    //     console.log("ass")
    //     return(
    //         <Forgot email={email} setEmail={setEmail} handleForgetPassword={handleForgetPassword}
    //     hasAccount={hasAccount} setHasAccount={setHasAccount}
    //     />
    //     )
        
    // }
    return(
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input
                     type="text"
                     autoFocus
                     required
                     value={email}
                     onChange={(e)=> setEmail(e.target.value)}
                />
            <p className='errorMsg'>{emailError}</p>
            <label>Password</label>
            <input 
                type="password"
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            <p className='errorMsg'>{passwordError}</p>
            <div className='btnContainer'>
                {hasAccount?(
                  <>
                  {/* <Link to="/admin/dashboard" render={(props) => <Admin {...props} />}> */}
                  <button className="butt" onClick={handleLogin}>Sign In</button>
                  {/* <Route path="/admin/dasboard" render={() => <Admin user={user} />} /> */}

                  {/* </Link> */}
                  <p>DOnt have an account? <span onClick={()=> setHasAccount(!hasAccount)}>Sign Up</span></p>
                  <p>Forgot Passoword? <span onClick={handleForgetPassword}>Reset Password</span></p>
                  {/* <button onClick={renderForget}>Reset Password</button> */}
                  {/* <span onClick={renderForget}>Forgot Password?</span> */}
                  </>  
                ):(
                  <>
                  <button className="butt" onClick={handleSignup}>Sign Up</button>
                  <p>Have an account?<span onClick={()=> setHasAccount(!hasAccount)}>Sign In</span></p>
                  </> 
                )}
            </div>
            </div>
        </section> 
    )
}

export default Login