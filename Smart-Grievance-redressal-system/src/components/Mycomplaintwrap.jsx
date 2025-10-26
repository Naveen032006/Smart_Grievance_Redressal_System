import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";
import download from './download.jpeg'
import { useState } from "react";

export function Mycomplainwrap({user}){
    const issues=[{
    label: "Broken streetlight on Main Street",
    description: "The streetlight has been broken for over a week, making the area unsafe at night.",
    category: "Infrastructure",
    status: "rejected",
    priority: "High",
    date: "1/15/2024",
    location: "123 Main Street, Downtown",
    response: "we have arranged a team to sort out the problem",
    update:true,
    selectedImage: [download]
  },
{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
    response: "we have arranged a team to sort out the problem",
    update:true
},{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
    response: "we have arranged a team to sort out the problem",
    update:false
},{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
    response: "we have arranged a team to sort out the problem",
    update:false
    
}];
    const [status,setstatus]=useState("")

    return (
        <Paper elevation={1} sx={{ borderRadius: "16px", p:"2px" ,m:2,overflow:"auto"}}>
            <Paper elevation={1} spacing={2} sx={{padding:"10px", borderRadius: "16px",maxHeight:"400px",overflowY:"scroll"}}>
            {issues.length===0?<Typography variant="body1">No issues reported yet.</Typography>:
          
            issues.map((issues)=>{
               
                return <Mycomplainbox label={issues.label} discription={issues.description} catogory={issues.category} setstatus={setstatus} status={issues.status} priority={issues.priority} date={issues.date} location={issues.location} response={issues.response} update={issues.update} selectedImage={issues.selectedImage} user={user}/>
            }
            )
        }
        </Paper>
            </Paper>

    );
}