import { Badge, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function LikeButton({ count, liked, onClick }) {
  return (
    <Tooltip title={liked ? "Unlike" : "Like"}>
      <IconButton onClick={onClick} color={liked ? "error" : "default"}>
        <Badge 
          badgeContent={count} 
          color={liked ? "error" : "default"} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <FavoriteIcon color={liked ? "error" : "default"} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}