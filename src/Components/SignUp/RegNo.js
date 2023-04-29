import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RegNo = ({id,handleClose,open}) => {
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"    
            >
            
                <DialogTitle id="alert-dialog-title">
                    {"Your Registration Number"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description" 
                           style={{fontWeight:"bold",letterSpacing:"9px",fontSize:"35px"}} 
                           color={'darkgreen'}
                    >
                        {id}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} autoFocus>SAVE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default RegNo;