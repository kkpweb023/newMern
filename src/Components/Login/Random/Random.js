import React from 'react';
import './Random.css';
import AutorenewIcon from '@mui/icons-material/Autorenew';


const Random = (props) => {

    function handleCaptcha() {
        props.setNum(Math.random().toString(36).substring(2, 8).toUpperCase());
    }

    return (
        <div className='random_div'>
            <label>
                <input type={'text'}
                    placeholder='Enter the text as shown in captcha'
                    onChange={(e) => props.setaplhNum(e.target.value)}
                    value={props.aplhNum}
                    maxLength={6}
                />
                <span className='alpha_Num'>{props.num}</span>
            </label>

            <span className='captcha'>
                <AutorenewIcon
                    sx={{ fontSize: 25}}
                    color={"primary"}
                    className="Icon"
                    onClick={handleCaptcha}
                ></AutorenewIcon>
            </span>
        </div>
    )
}
export default Random;