import { Button, Card, Stack, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
export function Header({title,subtitle,showicon,user}) {
    const icon=(title)=>{
        switch(title?.toLowerCase()){
            case "my complaints": return DescriptionIcon;
            case "analytics": return AssessmentOutlinedIcon;
            default: return DescriptionIcon;
        }
    }
    const Icon=icon(title);
    return(
        <Card elevation={1} sx={{borderRadius:3,display:"flex",justifyContent:title==="My Complaints"?"space-between":"center",alignItems:"center",padding:"10px",mb:2}}>
            <Stack  direction="row" spacing={1}   sx={{alignItems:"center",justifyContent:"center",padding:"10px",paddingLeft:"30px"}} >
                <Stack alignItems="center" justifyContent="center" sx={{backgroundColor:"#43ca80",color:"white",borderRadius:"40%",width:50,height:50}}>
                    <Icon fontSize="large" />
                </Stack>
                <Stack >
                    <Typography variant="h5" fontWeight="bold" >{user?"My Complaints":"All Complaints"}</Typography>
                    <Typography variant="body1" >{subtitle}</Typography>
                </Stack>
            </Stack>
            {showicon &&(
                <Stack direction="row" spacing={1} alignItems="center" sx={{padding:"1px"}} >
                    <Button variant="outlined"  color="diabled" sx={{borderRadius:2,textTransform: "none"}}startIcon={<DownloadIcon />} >Export</Button>
                    <Button variant="outlined"color="disabled" sx={{borderRadius:2,textTransform: "none"}}startIcon={<RefreshIcon />} >Refresh</Button>
                </Stack>
            )}
        </Card>

    );
}