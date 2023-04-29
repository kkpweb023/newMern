import React, { useState } from 'react';
import './ChangePass.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

let link = `https://cyan-encouraging-chiton.cyclic.app/changePass` /*|| `http://localhost:4000/changePass`*/;

const ChangePass = () => {

    const navigate = useNavigate();

    const[pass,setPass] = useState('');
    const[ComPass,setComPass] = useState('');

    const user = localStorage.getItem('user');

    function handleChangePass(){
            axios.put(`${link}/${JSON.parse(user)._id}`,{
                    password:pass
            },{
              headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            })
            .then((result)=>{
              if(result.data.modifiedCount === 1){
                    alert("Password changed successfully login again");
                    navigate('/login');
                    localStorage.clear();
              }else{
                alert("Aready Updated");
              }
            })
            .catch((error)=>console.log("! update failed"));
    }
    
  return (
    <div className='ChangePass'>

    <h1>Change Password</h1>

    <input type={'password'}
        placeholder='Enter new Password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
    />

    <input type={'password'}
        placeholder='Enter confirm new  Password'
        value={ComPass}
        onChange={(e) => setComPass(e.target.value)}
    />

    <button
        className='pass_btn'
        onClick={handleChangePass}
    >Submit</button>

</div>
  )
}

export default ChangePass;