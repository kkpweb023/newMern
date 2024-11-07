import React, { useEffect, useState } from 'react';
import './UpdateProduct.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

let link = /*`https://cyan-encouraging-chiton.cyclic.app`||*/`http://localhost:4000/update-Product`;

const UpdateProduct = () => {

  let navigate = useNavigate();
  let params = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    company: ""
  });

  useEffect(() => {
    axios.get(`${link}/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
      .then((result) => {
        setProduct(result.data[0])
      })
      .catch((error) => console.log("! 404 data fetch failed"));
  }, [params.id])


  function handleUpdate() {

    axios.put(`${link}/${params.id}`,{

      name: product.name,
      price: product.price,
      category: product.category,
      company: product.company

    },{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((result) => {

      if (result.data.modifiedCount === 1) {
        alert('Updated Successfully');
        navigate('/');
      } else {
        alert("update at list one field");
      }
    })
      .catch((error) => alert("! 404 updation failed"))
  }

  return (

        <div className='updateProduct_div'>

          <h1>Update Product</h1>

          <input type={'text'}
            placeholder={'Enter product name'} value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          <input type={'number'}
            placeholder={'Enter product price'} value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />

          <input type={'text'}
            placeholder={'Enter product category'} value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />

          <input type={'text'}
            placeholder={'Enter product company'} value={product.company}
            onChange={(e) => setProduct({ ...product, company: e.target.value })}
          />

          <button onClick={handleUpdate}>Update Product</button>
    
        </div>
  )
}
export default UpdateProduct;