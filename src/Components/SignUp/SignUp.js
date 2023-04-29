import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegNo from './RegNo';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

let link = 'https://cyan-encouraging-chiton.cyclic.app/register' /*|| 'http://localhost:4000/register'*/;

const SignUp = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [id, setId] = useState('');
    const [open, setOpen] = useState(false);
    const [load,setLoad] = useState(false);

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    useEffect(() => {
        const auth = localStorage.getItem('user');
        auth ? navigate('/') : navigate('/signUp');
    }, [navigate])


    function handleRegister() {

        setLoad(true);

        axios.post(link, {
            name: name,
            phone: phone,
            email: email,
            password: pass,
            image: ""

        }).then((result) => {

            if (result.data.auth) {
                localStorage.setItem('user', JSON.stringify(result.data.user));
                localStorage.setItem('token', JSON.stringify(result.data.auth));
                setId(result.data.user._id);
                setLoad(false);
                setOpen(true);

            } else {
                alert("Email Already Registered");
                setLoad(false)
            }
        })
        .catch((error) =>{
            setLoad(false);
            alert("! Registration failed try again")
        }) 
    }

    return (
        <div className='Register'>

            <h1>Register</h1>

            <input type={'text'}
                placeholder='Enter Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input type={'number'}
                placeholder='Enter Mobile Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <input type={'email'}
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input type={'password'}
                placeholder='Enter Password'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />

            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={load}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

            <button
                className='reg_btn'
                onClick={handleRegister}
            >Sign Up</button>

            <RegNo id={id} handleClose={handleClose} open={open}/>

        </div>
    )
}

export default SignUp;