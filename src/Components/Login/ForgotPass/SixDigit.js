import React, { useEffect, useState } from 'react';
import './SixDigit.css';
import { useNavigate, useParams } from 'react-router-dom';


const SixDigit = () => {

    const navigate = useNavigate();
    const [code,setCode] = useState('')

    let params = useParams();

    function handleForBtn(){

           if(code.length < 6){
                alert('Enter 6-digit code');
           }else{
                navigate(`/resetPass/${params.id}`);
                console.log(code);
           }
    }

       const [ second,setSecond ] = useState(59);
       const [ minute,setMinute ] = useState(1);
   
       useEffect(()=>{
        let timer;
        timer = setInterval(()=>{
            setSecond(second - 1);
            if(second === 0){
                setMinute(minute - 1);
                setSecond(59);
            } 
        },500)    
           return () => clearInterval(timer)      
       },[second,minute]);


       function handleResend(){
        setMinute(1);      
       }


    return (
        <div className='SixDigit'>

            <h1>Enter 6-Digit Code</h1>
            <h5>Enter 6 digit code that you receive on your email</h5>

            <input 
                type={'text'} 
                placeholder='Enter 6 digit code'
                maxLength={"6"}  
                value={code} 
                onChange={(e)=>setCode(e.target.value)}
            />

            {
                minute < 0 ?  
                <div className='Resend_btn' onClick={handleResend}><button>Resend Otp</button></div>
                :
                <div className='Code_timer'> {minute<10 ?"0"+minute:minute}:{second<10?"0"+second:second }</div>
            }
            
            <button className='code_btn' onClick={handleForBtn}>Continue</button>
        </div>
    )
}
export default SixDigit;