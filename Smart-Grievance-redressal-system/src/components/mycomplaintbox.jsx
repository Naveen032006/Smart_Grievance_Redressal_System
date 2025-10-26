    import {
        Box, Button, Chip, Dialog,  Paper, Stack, Typography, DialogTitle,
        DialogContent,
        DialogActions,
        IconButton,
        TextField,
    } from "@mui/material";
    import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
    import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
    import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
    import CancelIcon from '@mui/icons-material/Cancel';
    import AccessTimeIcon from '@mui/icons-material/AccessTime';
    import { alpha } from '@mui/material/styles';
    import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
    import Color from './Color'
    import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
    import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
    import { useState } from "react";
    import CloseIcon from '@mui/icons-material/Close';
    export function Mycomplainbox({ label, discription, catogory, status, priority, date, location, response, update,selectedImage,user,setstatus }) {
        const [pop, setpop] = useState(false);
        const [SStatus,setSStatus]=useState(status);
        const [updatepop,setupdatepop]=useState(false);
        function statushandle(newstatus){
            setstatus(newstatus);
            setSStatus(newstatus);
        }
        const getcolor = (SStatus) => {
            switch (SStatus?.toLowerCase()) {
                case "pending": return "warning";
                case "in progress": return "info";
                case "resolved": return "success";
                case "rejected": return "error";
                default: return "default";
            }
        }

        const getPcolor = (priority) => {
            switch (priority?.toLowerCase()) {
                case "high": return "error";
                case "medium": return "warning";
                case "low": return "info";
                default: return "default";
            }
        }
        const getIcon = (SStatus) => {
            switch (SStatus?.toLowerCase()) {
                case "pending": return AccessTimeIcon;
                case "in progress": return ReportProblemOutlinedIcon;
                case "resolved": return DoneOutlineIcon;
                case "rejected": return CancelIcon;
                default: return "default";
            }
        }
        const Icon = getIcon(SStatus);

        return (
            <>
                <Paper elevation={1} sx={{ borderRadius: "16px", p: 2, m: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Stack direction="row" spacing={1} alignItems="center" >
                            <Icon color={getcolor(status)} fontSize="small" />
                            <Typography variant="h5" fontWeight="bold">{label}</Typography>
                        </Stack>
                        <Chip label={priority} variant="outlined" sx={{ textDecoration: "none", backgroundColor: (theme) => alpha(theme.palette[getPcolor(priority)].main, .8), color: Color.secondary }} />
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center" >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <RoomOutlinedIcon color="disabled" fontSize="small" />
                            <Typography variant="body2">{location}</Typography>

                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center" >
                            <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
                            <Typography variant="body2">{date}</Typography>
                        </Stack>
                        <Chip label={catogory} variant="outlined" sx={{ textDecoration: "none" }} />

                    </Stack>
                    <Stack >
                        <Typography variant="body1" sx={{ padding: "5px" }}>{discription}</Typography>
                    </Stack>
                    {update &&
                        <Stack spacing={0.5} direction="column" sx={{ backgroundColor: "#e3edfcff", color: "blue", borderRadius: "10px", padding: "5px", paddingLeft: "10px", border: "1px solid #c3b7fcff" }}>
                            <Typography variant="caption" fontWeight="bold" color="info">Management Response:</Typography>
                            <Typography variant="caption" sx={{ paddingLeft: 2 }}>{response}</Typography>
                        </Stack>
                    }


                    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "5px" }} >
                        <Chip label={status} color={getcolor(status)} variant="filled" sx={{ textDecoration: "none" }} />
                        <Stack direction="row" spacing={0.5} alignItems="center" >
                            {!user&& (<Button variant="outlined" size="medium"  color="secondary" sx={{ borderRadius: 3, textTransform: "none" }} onClick={()=>{setupdatepop(true)}}>Update Status</Button>)}
                            <Button variant="outlined" size="medium" sx={{ borderRadius: 3, textTransform: "none" }} startIcon={<RemoveRedEyeOutlinedIcon />} color="info" onClick={() => setpop(true)}>Veiw details</Button>
                            <Button variant="outlined" size="medium" sx={{ borderRadius: 3, textTransform: "none" }} startIcon={<CancelOutlinedIcon />} color="error" >cancel</Button>
                        </Stack>
                    </Box>



                </Paper>
                <Dialog open={pop} onClose={() => setpop(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" fontWeight="bold" sx={{color:"black"}}>{label}</Typography>
                        <Chip label={priority} variant="outlined" sx={{ 
                            textDecoration: "none", 
                            backgroundColor: (theme) => alpha(theme.palette[getPcolor(priority)].main, .8), 
                            color: Color.secondary 
                        }} />
                    </Box>
                </DialogTitle>
                
                <DialogContent>
                    <Stack spacing={2}>
                        {/* Status and Category */}
                        <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={status} color={getcolor(status)} variant="filled" />
                            <Chip label={catogory} variant="outlined" />
                        </Box>

                        {/* Location and Date */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <RoomOutlinedIcon color="disabled" fontSize="small" />
                                <Typography variant="body2">{location}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
                                <Typography variant="body2">{date}</Typography>
                            </Stack>
                        </Stack>

                        {/* Description */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Description:
                            </Typography>
                            <Typography variant="body1" sx={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                                {discription}
                            </Typography>
                        </Box>
                        {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Complaint attachment preview"
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '70vh', 
                                objectFit: 'contain' 
                            }}
                        />
                    )}

                        {/* Management Response */}
                        {update && (
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    Management Response:
                                </Typography>
                                <Stack spacing={0.5} direction="column" sx={{ 
                                    backgroundColor: "#e3edfcff", 
                                    borderRadius: "10px", 
                                    padding: "10px", 
                                    border: "1px solid #c3b7fcff" 
                                }}>
                                    <Typography variant="body2">{response}</Typography>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => setpop(false)} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={updatepop} onClose={()=>{setupdatepop(false)}}  fullWidth maxWidth="xs"  >
                <Box sx={{padding:"1rem"}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,padding:"0px"}}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" ,color:"black"}}>Update Complaint Status</Typography>
                        <IconButton onClick={() => { setupdatepop(false) }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="caption" sx={{color:"grey",padding:"0px"}}>Update the Status of Complaint: {label} </Typography>
               
               <Stack>
                    <Typography variant="suntitle2" sx={{padding:"0.5rem"}}>Response (Optional)</Typography>
                    <TextField variant="outlined" label="response" placeholder="Provide the response to the civilian" color="info"></TextField>
               </Stack>
               <Box sx={{padding:"1rem 0.5rem 0.5rem 3rem",display:"flex",justifyContent:"space-between"}}>
                    <Button variant="outlined" sx={{textTransform:"none" }} size="small" color="error"> Mark Pending</Button>
                    <Button variant="outlined" sx={{textTransform:"none"}} size="small"> Mark in Progress</Button>
                    <Button variant="contained" color="success" sx={{textTransform:"none"}} size="small"> Mark Resolved</Button>
               </Box>
               </Box>



            </Dialog>
                
            </>
        );
    }