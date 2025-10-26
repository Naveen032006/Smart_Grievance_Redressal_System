import { Stack } from "@mui/material";
import { Smallbox } from "./smallbox";

const item=[{
    status:"total issue",
    nos:"150"
},{
    status:"pending",
    nos:"30"    
},{
    status:"in progress",
    nos:"70"
},{
    status:"resolved",
    nos:"50"
}];
export function Smallboxview(){
    return(
        <Stack direction="row" spacing={2} sx={{m:2}}>
            {item.map((item)=>{
                return <Smallbox status={item.status} nos={item.nos}/>
            })}
        </Stack>
    )
}