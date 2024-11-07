import React, { useState } from 'react';
import './Profile.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DelConfom from './DelConfom';
//import Pic from './UploadPic';


let link = `https://database-production-ba58.up.railway.app`/*|| `http://localhost:4000`;*/

const Profile = () => {

    const user = localStorage.getItem('user');
    const id = JSON.parse(user)._id;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

      const handleClose = () => {

          axios.delete(`${link}/${JSON.parse(user).email}`,{
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
          .then((result)=>{
                if(result.data.deletedCount){
                  setOpen(false);
                  navigate('/signUp');  
                }else{
                  alert(result.data)
                }
          })
          .catch((error)=>console.log("deletion failed"));
          localStorage.clear();
      };

    
    function handleDelete(){
          setOpen(true);
    }


    function handleChange(){
          navigate('/profile/changePassword');
    }

  return (
    <>
      <h1 style={{ padding:"0px 0px 0px 20px",fontWeight:"bold"}}>Profile Information</h1>

      <div className='reg_num'><b>Registration No:</b> {id}</div>

      <hr />
      <div className='Personal_info'>

            {/* <div className='photoPic_div'>
                <Pic />
              </div>
          */}


        <div className='Info_div'>
          <h2 style={{ paddingBottom: "10px"}}><center>Personal Details</center></h2>

          <div><b>Name:</b> {JSON.parse(user).name}</div>
          <div><b>Email:</b> {JSON.parse(user).email}</div>
          <div><b>Mobile No:</b>{JSON.parse(user).phone}</div>
        </div>

        <div className='account_div'>
          <h3 style={{ paddingBottom: "10px" }}><center>Account Setting</center></h3>

          <div><b>Change Password:</b>
                  <Button variant="outlined" 
                          size="small" 
                          style={{ marginLeft: "30px",fontSize:"11px"}}
                          onClick={handleChange}
                          >CHANGE</Button>
          </div>

          <div style={{ marginTop: "15px" }}><b>Delete Account:</b>
               
                    <button className='delBtn' onClick={handleDelete}>Permanently delete my account</button>

                      <DelConfom 
                            handleDelete={handleDelete} 
                            open={open} 
                            id={id} 
                            setOpen={setOpen}
                            handleClose={handleClose}
                        />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile