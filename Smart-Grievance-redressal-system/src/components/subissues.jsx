import { Paper, Typography } from "@mui/material";
import { SubissueBox } from "./subissuebox";


export function Subissue(){
   const issues=[{
    label: "Broken streetlight on Main Street",
    description: "The streetlight has been broken for over a week, making the area unsafe at night.",
    category: "Infrastructure",
    status: "rejected",
    priority: "High",
    date: "1/15/2024",
    location: "123 Main Street, Downtown",
  },
{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
},{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
},{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
}];
    return (
        <Paper elevation={1} sx={{ borderRadius: "16px", p:"2px" ,m:2,overflow:"auto"}}>
            <Paper elevation={0} spacing={1} sx={{padding:"10px", borderRadius: "16px",maxHeight:"400px",overflowY:"auto"}}>
            <Typography variant="subtitle1"> Recent Sub-Issue</Typography>
            {issues.length===0?<Typography variant="body1">No issues reported yet.</Typography>:
            issues.map((issues)=>{
                return <SubissueBox label={issues.label} discription={issues.description} catogory={issues.category} status={issues.status} priority={issues.priority} date={issues.date} location={issues.location} />
            }
            )
        }
        </Paper>
            </Paper>
    );
}


