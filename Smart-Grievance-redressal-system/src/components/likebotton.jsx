import { Badge, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
export function LikeButton({Pvalue}){
    const [count,setCount]=useState(Pvalue)
    const [liked,setLiked]=useState(false)
    const handleCLick=()=>{
        setCount(liked?count-1:count+1);
        setLiked(!liked);
    }



return(
<Tooltip title={liked ? "Unlike" : "like"}>
    <IconButton onClick={handleCLick} color={liked ? "error" : "default"}>
        <Badge badgeContent={count} color={liked ? "erroe" : "default"} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <FavoriteIcon color={liked ? "error" : "default"} />
            
        </Badge>
    </IconButton>
</Tooltip>
);
}