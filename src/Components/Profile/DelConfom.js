import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DelConfom = ({id,handleClose,open,setOpen}) => {

     function handleCancel(){
        setOpen(false);
     }

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Your Registration Number: "}
                    {id}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete your account Permanently? 
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCancel} autoFocus>Cancel</Button>
                    <Button variant="outlined" color="error" size={'small'} onClick={handleClose} autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DelConfom;