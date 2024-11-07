import React, { useEffect, useState } from 'react';
import { Button, Input } from '@mui/material';
import axios from 'axios';
import './UploadPic.css';
import removePic from '../../Images/picNOT.png';

let link = `https://database-production-ba58.up.railway.app/` /*&& `http://localhost:4000`*/;

const Pic = () => {

    const [image, setImage] = useState('');
    const [pic, setPic] = useState([]);
    const user = localStorage.getItem('user');
    const formData = new FormData()
    formData.append('photo', image)

    function handleClick() {

        axios.put(`${link}/upload/${JSON.parse(user)._id}`, formData)
            .then((result) => console.log(result))
            .catch((error) => console.log("! 404 upload failed"));

        window.location.reload();

    }

    function handleRemove() {
        axios.put(`${link}/remove/${JSON.parse(user)._id}`, formData)
            .then((result) => alert("Remove Sucessfully"))
            .catch((error) => console.log("! 404 upload failed"));
        window.location.reload();
    }

    useEffect(() => {
        axios.get(`${link}/${JSON.parse(user)._id}`)
            .then((result) => { setPic(result.data[0].image)
                                 console.log(result.data[0])
                                })
            .catch((error) => console.log("! 404 get failed"));
    }, [user])

    
    return (
        <>
            <img src={pic} alt='' />

            {pic ? <div className='remove' onClick={handleRemove}>X</div>
                : <img src={removePic} alt='' />
            }
            <Input
                type={'file'}
                accept='image/*'
                id={'file'}
                name="photo"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
            />
            <label htmlFor='file' className='labelUpload'>Choose file</label>

            <Button variant={"contained"}
                component={'span'}
                size={'small'}
                onClick={handleClick}
                className='btn_upload'
            >Upload</Button>
        </>
    )
}
export default Pic;
