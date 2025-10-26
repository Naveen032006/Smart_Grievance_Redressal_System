import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import './log.css'

import { LikeButton } from "./likebotton";
export function SubissueBox({label, discription, catogory, status,priority,date,location }) {
    const getcolor=(status)=>{
        switch(status?.toLowerCase()){
            case "pending": return "warning";
            case "in progress": return "info";
            case "resolved": return "success";
            case "rejected": return "error";
            default: return "default";
        }
    }

    const  getPcolor=(priority)=>{
        switch(priority?.toLowerCase()){
            case "high": return "error";
            case "medium": return "warning";
            case "low": return "info";
            default: return "default";
        }
    }
   

    return (
        <>
            <Paper elevation={3} sx={{padding:"10px",borderRadius: "12px", p:"2px" ,mb:2,maxHeight:200}}>
                <Box  sx={{display:"flex",justifyContent:"space-between",padding:"2px"}} >
                    
                    <Typography variant="subtitle2" fontWeight="bold" >{label}</Typography>
                    <Chip label={priority} color={getPcolor(priority)} variant="filled"  sx={{ textDecoration: "none" }}/>

                </Box>
               
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{padding:"1px"}} >
                        <RoomOutlinedIcon color="disabled" fontSize="small" />
                        <Typography variant="caption">{location}</Typography>

                    </Stack>
                    
                   
                     
                
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{padding:"1px"}} >
                        <Chip label={status} color={getcolor(status)} variant="filled"  sx={{ textDecoration: "none" }}/>
                        <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
                        <Typography variant="captioin">{date}</Typography>
                    </Stack>
                <Stack sx={{ padding: "2px" }}>
                    <Typography variant="caption" >{discription}</Typography>
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "space-between",padding:"2px" }}>
                   
                    <Chip label={catogory} variant="outlined"   sx={{ textDecoration: "none" }}  />
                    <LikeButton Pvalue={10}/>
                </Box>



            </Paper>
        </>
    )
}