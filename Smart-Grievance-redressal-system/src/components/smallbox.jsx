
import { Paper, Stack, Typography } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './log.css'
 export function Smallbox({status,nos}){
     const getcolor=(status)=>{
        switch(status?.toLowerCase()){
            case "pending": return "warning";
            case "in progress": return "info";
            case "resolved": return "success";
            case "total issue": return "info";
            default: return "default";
        }
    }
   const getIcon=(status)=>{
        switch(status?.toLowerCase()){
            case "pending": return AccessTimeIcon;
            case "in progress": return ReportProblemOutlinedIcon;
            case "resolved": return DoneOutlineIcon;
            case "total issue": return DescriptionIcon;
            default: return "default";
        }
    }
    
    const Icon=getIcon(status);
    return(
        <Paper elevation={1} sx={{borderRadius:"16px",p:2,flex:1}}  className="smallbox">
            <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={3} >
                    <Typography variant="h5">{status}</Typography>
                    <Icon color={getcolor(status)} fontSize="large"/>  
                </Stack>
                <Typography variant="h3" fontWeight="bold" color={getcolor(status)}>{nos}</Typography>
            </Stack>
        </Paper>
    );
}