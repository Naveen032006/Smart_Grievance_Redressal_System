import { Paper, Stack } from "@mui/material";
import { AnalyticsBox } from "./analyticsbox";

export function Alayticswrap(){
    const report=[
        {title:"Resolution Rate"},
        {title:"Total Submitted"},
        {title:"Avg Resolution"},
        {title:"Impact Score"},
    ];
    return(
        <Paper elevation={0} sx={{ padding: '10px', textAlign: 'center',justifyContent:"center"}}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                {report.map((data)=><AnalyticsBox title={data.title}/>)}
            </Stack>
        </Paper>

    );
}