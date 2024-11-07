import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


let link = `https://database-production-ba58.up.railway.app/` /*|| `http://localhost:4000/add-Product`*/;

const AddProduct = () => {

  let navigate = useNavigate();

  const userId = localStorage.getItem('user')

  const [product, setProduct] = useState({

    name: "",
    price: "",
    category: "",
    company: ""

  });

  const [error,setError] = useState(false);


function handleAdd() {
  
  if(!product.name || !product.price || !product.category || !product.company){
    setError(true);
    return false;  
  }

    axios.post(link,{
      name: product.name,
      price: product.price,
      category: product.category,
      company: product.company,
      userId: JSON.parse(userId)._id,

    },{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((result)=>console.log(result.data))
    .catch((error)=>console.log("! data add failed"));

    navigate('/');

  }



  return (

    <div className='addProduct_div'>

      <h1 className='h1'>Add Product</h1>

      <input type={'text'}
        placeholder={'Enter product name'}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      {error && !product.name &&  <small className='error'>Enter valid name</small>}



      <input type={'text'}
        placeholder={'Enter product price'}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      {error && !product.price &&  <small className='error'>Enter valid price</small>}

      <input type={'text'}
        placeholder={'Enter product category'}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      {error && !product.category && <small className='error'>Enter valid category</small>}

      <input type={'text'}
        placeholder={'Enter product company'}
        onChange={(e) => setProduct({ ...product, company: e.target.value })}
      />
      {error && !product.company && <small className='error'>Enter valid company</small>}


      <button onClick={handleAdd}>Add Product</button>

    </div>

  )
}

export default AddProduct;