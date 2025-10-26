import './App.css';
import color from './components/Color'
import Login from  './components/Login';
//import Body from './components/Body';
import Nav from './components/Nav';
import Mycomplain from './components/Mycomplain';
import SubComplain from './components/SubComplain';
import Analytics from './components/Analytics';
//import Logcontext from './components/logcontext';
import { useContext, useState } from 'react';
import { Link, } from 'react-router-dom';
import Color from './components/Color'

import OverView from './components/OverView';
import { Logincontext } from './components/logcontext';
function Header(props){
  const hStyle={
      color:Color.white,
      textAlign:"center",
      margin:"0",
  }
  return <h1 style={hStyle}>Hi! {props.title}</h1>
}
function App() {
     const{login,setlogin,userid}=useContext(Logincontext)
   
   
    const[navi,setnavi]=useState(false);
    const [Overview,setoverview]=useState(true);
    const [scomp,setscomp]=useState(false);
    const [mycomp,setmycomp]=useState(false);
    const [analy,setanaly]=useState(false);
    const [user,setuser]=useState(true);

      const liStyle={
          textAlign:"center",
          margin:"50px",
          fontSize:"150%",
          textDecoration:"none",
          color:Color.secondary,
      }
      const btStyle={
         background: Color.secondary,
  color: Color.primary,
  padding: "8px 16px",          // flexible spacing instead of fixed width
  marginTop: ".5%",
  height: "40px",               // smaller height for better proportions
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
  whiteSpace: "nowrap",         // prevent text wrapping
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
  transition: "0.3s ease",    
      }

  return (
  <>
    
    {login ? 
    <>
    <div id="toggle">
      <label className={`user${user?"":" closed"}`} style={{backgroundColor:Color.primary,color:Color.secondary}} onClick={()=>{setuser(true)}}>User</label>
      <label className={`admin${user?" closed":""}`} style={{backgroundColor:Color.primary,color:Color.secondary}} onClick={()=>{setuser(false)}}>Admin</label>
    </div>
    {user?<Login key="user"  text="User id" user={user}/>:
    <Login key="admin" text="Admin id" user={user}/>
    }
    </>
    :
    user? 
        <div className='UserBody'>
        
        <Header title="Welcome Citizen" />
        <nav id="topbar" style={{background:color.primary,maxWidth:"100vw",overflow:"auto"}}>
              <div className={`hamburger ${navi?"navi":""}`} onClick={()=>{setnavi(!navi)}}>
                <div className='line' style={{background:color.secondary}}></div>
                <div className='line'style={{background:color.secondary}}></div>
                <div className='line' style={{background:color.secondary}}></div>
              </div>
              <ul id="ulist" style={{color:color.secondary}}>
                  <li><Link to='/' style={liStyle}>Home</Link></li>
                  <li><Link to='/Ward-Details' style={liStyle}>Ward Details</Link></li>
                  <li><Link to='/Contacts'  style={liStyle}>Contacts</Link></li>
              </ul>
              <button style={btStyle} className="Submit" onClick={()=>{setlogin(!login);localStorage.setItem("isloggedin", "false")}}>{userid}</button>
        </nav>
        {navi && <Nav mycomp={mycomp} setmycomp={setmycomp} analy={analy} setanaly={setanaly} setnavi={setnavi} scomp={scomp} setscomp={setscomp} Overview={Overview} setoverview={setoverview} user={userid} login={login}loginset={setlogin}/>}
        <div className="BodyBody11" style={{opacity:navi?0.5:1}} onClick={()=>{setnavi(false)}}>
          {Overview && <div className='content1'><OverView userid={userid} user={user}/></div>}
          {scomp && <div className='content1'><SubComplain/></div>}
          {mycomp && <div className='content2'><Mycomplain user={user}/></div>}
          {analy && <div className='content3'><Analytics/></div>}
        </div>
        </div>
      :
      <div className='AdminBody'>
        <Header title="Welcome, Resolver" />
        <nav id="topbar" style={{background:color.primary,maxWidth:"100vw",overflow:"auto"}}>
              <div className={`hamburger ${navi?"navi":""}`} onClick={()=>{setnavi(!navi)}}>
                <div className='line' style={{background:color.secondary}}></div>
                <div className='line'style={{background:color.secondary}}></div>
                <div className='line' style={{background:color.secondary}}></div>
              </div>
              <ul id="ulist" style={{color:color.secondary}}>
                  <li><Link to='/' style={liStyle}>Home</Link></li>
                  <li><Link to='/Ward-Details' style={liStyle}>Ward Details</Link></li>
                  <li><Link to='/Contacts'  style={liStyle}>Contacts</Link></li>
              </ul>
              <button style={btStyle} className="Submit" onClick={()=>{setlogin(!login);localStorage.setItem("isloggedin", "false")}}>{userid}</button>
        </nav>
        {navi && <Nav mycomp={mycomp} setmycomp={setmycomp} analy={analy} setanaly={setanaly} setnavi={setnavi} scomp={scomp} setscomp={setscomp} Overview={Overview} setoverview={setoverview} user={userid} login={login}loginset={setlogin}/>}
        <div className="BodyBody11" style={{opacity:navi?0.5:1}} onClick={()=>{setnavi(false)}}>
          {Overview && <div className='content1'><OverView userid={userid} user={user} /></div>}
          {scomp && <div className='content1'><SubComplain/></div>}
          {mycomp && <div className='content2'><Mycomplain /></div>}
          {analy && <div className='content3'><Analytics/></div>}
        </div>
      </div>
    }
    </>
  );
  
}

export default App;
