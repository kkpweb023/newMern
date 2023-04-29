import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Button } from '@mui/material';
import Random from './Random/Random';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';

let link = 'https://cyan-encouraging-chiton.cyclic.app/login' /*|| 'http://localhost:4000/login'*/;


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [pass, setPass] = useState('');

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<VisibilityOffIcon style={{ fontSize: "20px" }} />);

    let [isLoading, setLoading] = useState(false);

    const [aplhNum, setaplhNum] = useState("");
    const [num, setNum] = useState("SD5T76");

    function handleIcon() {
        if (type === 'password') {
            setType('text');
            setIcon(<VisibilityIcon style={{ fontSize: "20px" }} />);
        } else {
            setType('password');
            setIcon(<VisibilityOffIcon style={{ fontSize: "20px" }} />)
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
        auth ? navigate('/') : navigate('/login');
    }, [navigate])


    function handleLogin() {

        if (num !== aplhNum) {
            alert("Captcha not matched")
        } else {

            setLoading(true);

            axios.post(link, {
                email: email,
                password: pass
            }).then((result) => {
                setLoading(false);
                if (result.data.auth) {
                    localStorage.setItem('user', JSON.stringify(result.data.user));
                    localStorage.setItem('token', JSON.stringify(result.data.auth));
                    navigate('/');
                } else {
                    alert("Please Enter correct email id and password");
                }
            }).catch((error) => alert("! Login failed try again"));
        }
    }

    function handlePass() {
        navigate('/forgotPass');
    }


    return (
        <div className='Login'>

            <PersonIcon className='icon_login' />

            <input type={'email'}
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input type={type}
                placeholder='Enter Password'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <span className="Visible_icon" onClick={handleIcon}>{icon}</span>


            <Random aplhNum={aplhNum} setaplhNum={setaplhNum} num={num} setNum={setNum} />

            <Button color="secondary" size="small"
                style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    position: "relative",
                    left: "16%",
                    top: "20px"
                }}
                onClick={handlePass}
            >Forgot Password ?</Button>

            <button
                className='log_btn'
                onClick={handleLogin}
            >
                {isLoading ?
                    <span><i className="fa fa-refresh fa-spin fa-fw"></i></span>
                    : ""
                } Login </button>
        </div>
    )
}
export default Login;