import { Paper, Stack, Typography } from "@mui/material";
import { IssueBox } from "./issuebox";

 /*issue=[{
    label: "Broken streetlight on Main Street",
    description: "The streetlight has been broken for over a week, making the area unsafe at night.",
    category: "Infrastructure",
    status: "Pending Review",
    priority: "High",
    date: "1/15/2024",
    location: "123 Main Street, Downtown",
  },
{
    label: "Broken Watertank on Main Street",
    description: "The Wathertankn has been broken for over a week, making people suffer a lot.",
    category: "Basic Needs",
    status: "Pending Review",
    priority: "low",
    date: "20/12/2024",
    location: "123 Main Street, Downtown",
  }
];*/
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
}];
export function Issuesview(){
    return (
        <Paper elevation={1} sx={{ borderRadius: "16px", p: 2 ,m:2}}>
            <Typography variant="subtitle1"> Recent Issue</Typography>
            <Stack spacing={2}>
            {issues.length===0?<Typography variant="body1">No issues reported yet.</Typography>:
            issues.map((issues)=>{
                return <IssueBox label={issues.label} discription={issues.description} catogory={issues.category} status={issues.status} priority={issues.priority} date={issues.date} location={issues.location} />
            })
        }
        </Stack>
        </Paper>
    );
}