import React, { useState } from 'react';
import './ForgotPass.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

let link = `https://database-production-ba58.up.railway.app/getID` /*|| `http://localhost:4000/getID`*/;


const ForgotPass = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState('')

    function handleForBtn(){

        if(email){
            axios.get(`${link}/${email}`)
            .then((result)=>{
                if(result.data === "Invalid Email Id"){
                    alert("! Invalid Email Id")
                }else{
                    navigate(`/sixDigit/${result.data}`)
                }
            })
            .catch((error)=>console.log("! 404 failed"));
        }else{
              alert('! enter correct email')
        }
    }

    
    return (
        <div className='ForgotPass'>

            <h1>Forgot Password</h1>
            <h5>Enter your email for the varification process. We will send 6 digit code in your email</h5>

            <input type={'email'} placeholder='Enter your email id' onChange={(e)=>setEmail(e.target.value)}/>

            <button className='for_btn' onClick={handleForBtn}>Continue</button>

        </div>
    )
}
export default ForgotPass;