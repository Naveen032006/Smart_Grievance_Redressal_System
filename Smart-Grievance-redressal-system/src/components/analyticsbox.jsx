import { Paper, Stack, Typography } from "@mui/material";
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
export function AnalyticsBox({title}) {
    const icon=(title)=>{
        switch(title?.toLowerCase()){
            case "resolution rate": return TrackChangesOutlinedIcon;
            case "total submitted": return TrendingUpIcon;
            case "avg resolution": return AccessTimeIcon;
            case "impact score": return WorkspacePremiumIcon;
            default: return TrackChangesOutlinedIcon;
        }

    }
    const fullback=(title)=>{
        switch(title?.toLowerCase()){
            case "resolution rate": return "#F2FFFA";
            case "total submitted": return "#F5F9FF";
            case "avg resolution": return "#FFFBF2";
            case "impact score": return "#FFF7FF";
            default: return "#F2FFFA";
        }
        
    }
    const titelcolor=(title)=>{
        switch(title?.toLowerCase()){
            case "resolution rate": return "#006C45";
            case "total submitted": return "#0052CC";
            case "avg resolution": return "#B25A00";
            case "impact score": return "#8000B2";
            default: return "#00B273";
        }
    }
    const prercentcolor=(title)=>{
        switch(title?.toLowerCase()){
            case "resolution rate": return "#004D32";
            case "total submitted": return "#003399";
            case "avg resolution": return "#7A3B00";
            case "impact score": return "#660099";
            default: return "#004D32";
        }
    }
    const iconcolor=(title)=>{
        switch(title?.toLowerCase()){
            case "resolution rate": return "#b2f9e0ff";
            case "total submitted": return "#c7dafeff";
            case "avg resolution": return "#fbe2b7ff";
            case "impact score": return "#ffaaf8ff";
            default: return "#8df6d1ff";
        }
    }
    const iconincolor=(title)=>{
        switch(title?.toLowerCase()){
            case "resolution rate": return "success";
            case "total submitted": return "info";
            case "avg resolution": return "warning";
            case "impact score": return "secondary";
            default: return "success";
        }
    }
    const Icon=icon(title);
    return(
        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center',backgroundColor:fullback(title),borderRadius:"16px"}}>
            <Stack   sx={{color:titelcolor(title)}} alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="h6" >{title}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Typography variant="h4" fontWeight="bold" sx={{color:prercentcolor(title)}}>75%</Typography>
                <Stack alignItems="center" justifyContent="center" sx={{backgroundColor:iconcolor(title),borderRadius:"50%",width:50,height:50}}>
                <Icon color={iconincolor(title)} fontSize="large"/>
                </Stack>
            </Stack>
            <Stack variant="caption" sx={{color:titelcolor(title)}}> 0 of 1 resolved</Stack>
            </Paper>
    );
}