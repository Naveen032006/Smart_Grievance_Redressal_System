import { createContext, useState } from "react";
export const Logincontext=createContext();
const isloggedinlocal=localStorage.getItem("isloggedin");
export function Loginprovider({children}){  
     const [login,setlogin]=useState(isloggedinlocal===
        "true"?false:true);
     const[userid,setuserid]=useState("");
    
    return(
        <Logincontext.Provider  value={{login,setlogin,userid,setuserid}}>
            {children}
        </Logincontext.Provider>
    );
}
