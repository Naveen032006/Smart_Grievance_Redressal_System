//import { useState } from 'react';
import Color from './Color';
import'./Nav.css'
function Nav({mycomp,setmycomp,analy,setanaly,setnavi,scomp,setscomp,Overview,setoverview,login,loginset}){
    return(
        <>
            <div className='verticalNav' style={{backgroundColor:Color.white,transition:"all 0.2s ease-in-out","&:hover":{transform: "scale(1.05)",},fontSize:"12px"}}>
                <li className={`overv ${Overview ? "open" : ""}`} style={{border: `5px solid ${Color.primary}`,color:Color.secondary,...(Overview?{color:Color.secondary,background:Color.primary} : {})}} onClick={()=>{setoverview(true);setscomp(false);setmycomp(false);setanaly(false)}}>Overview</li>
                <li className={`vnav ${scomp ? "open" : ""}`} style={{border: `5px solid ${Color.primary}`,color:Color.secondary,...(scomp?{color:Color.secondary,background:Color.primary} : {})}}  onClick={()=>{setscomp(true);setoverview(false);setmycomp(false);setanaly(false)}}>Submit Complaints</li>
                <li className={`mycom ${mycomp ? "open" : ""}`} style={{border: `5px solid ${Color.primary}`,color:Color.secondary,...(mycomp?{color:Color.secondary,background:Color.primary} : {})}} onClick={()=>{setmycomp(true);setoverview(false);setscomp(false);setanaly(false)}}>My Complaints</li>
                <li className={`anal ${analy ? "open" : ""}`} style={{border: `5px solid ${Color.primary}`,color:Color.secondary,...(analy?{color:Color.secondary,background:Color.primary} : {})}} onClick={()=>{setanaly(true);setoverview(false);setscomp(false);setmycomp(false)}}>Analytics</li>
                <li className='logout' onClick={()=>{loginset(!login);setnavi(false)}} style={{background:Color.secondary,color:Color.white}}>log out</li>
            </div>
        </>
    ) 
}
export default Nav;