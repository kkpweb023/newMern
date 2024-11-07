import React, { useState } from 'react';
import './ResetPass.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

let link = `https://database-production-ba58.up.railway.app/forgotPass` /*|| `http://localhost:4000/forgotPass`*/;

const ResetPass = () => {

  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [ComPass, setComPass] = useState('');

  let params = useParams();

  function handleResetPass() {

    axios.put(`${link}/${params.id}`,{
      password: pass
    })
      .then((result) =>{
        if (result.data.modifiedCount === 1) {
          alert("Password Reset successfully");
          navigate('/login');
        }else if(result.data.modifiedCount === 0){
          alert("This is exiting password");
        }
      })
      .catch((error) => console.log("! update failed"));
  }




  return (
    <div className='ChangePass'>

      <h1>Reset Password</h1>

      <input type={'password'}
        placeholder='Enter Password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <input type={'password'}
        placeholder='Enter confirm  Password'
        value={ComPass}
        onChange={(e) => setComPass(e.target.value)}
      />

      <button
        className='pass_btn'
        onClick={handleResetPass}
      >Reset Password</button>

    </div>
  )
}

export default ResetPass;