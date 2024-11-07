import React, { useEffect, useState } from 'react';
import './ProductList.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


let link = "https://database-production-ba58.up.railway.app" /*|| 'http://localhost:4000'*/;


const ProductList = () => {

  let navigate = useNavigate();

  const [data, setData] = useState([]);
  let [isLoading, setLoading] = useState(false);

  const getProduct = () => {
    setLoading(true);
    axios.get(`${link}/list-Product`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
      .then((result) => {
        setData(result.data)
        setLoading(false);
      })
      .catch((error) => console.log("! 404 data fetch failed"));
  }
  useEffect(() => {
    getProduct();
  }, [])


  function handleEdit(id) {
    navigate(`/update/${id}`);
  }

  function handleDelete(del) {

    axios.delete(`${link}/delete-Product/${del}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
      .then((result) => {
        if (result.data.deletedCount) {
          getProduct()
          alert('Delete Successfully')
        } else {
          alert('Delete failed')
        }
      })
      .catch((error) => console.log('deletion failed'));
  }


  function handleSearch(e) {

    let key = e.target.value;

    if (key) {

      axios.get(`${link}/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
        .then((result) => setData(result.data))
        .catch((error) => console.log("Search Failed"));

    } else {
      getProduct();
    }
  }


  return (

    <div className='product-list-div'>

      <h1 style={{ fontWeight: "bold" }}>Product List</h1>

      <input type={'search'}
        placeholder={'Search Product...'}
        className={'search_box'}
        onChange={handleSearch}
      />

      {isLoading ?
        <Audio
          height="232"
          width="140"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor='#F4442E'
          barColor='#51E5FF'
        />
        :
        <Table striped hover bordered className="table" >
          <thead className="thead">
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              data === "No data found"
                ?
                <tr className='tr_cart'>
                  <td colSpan={'6'} className='cart'>
                    Add product 
                    <ShoppingCartIcon 
                        color='error' style={{ cursor:"pointer",marginLeft:"8%" }}
                        sx={{fontSize:"50px"}} 
                        onClick={() => navigate('/add')} />
                  </td>
                </tr>
                :
                data.length > 0 ?

                  data.map((value, index) =>

                    <tr key={index}>
                      <td data-label="S.No.">{index + 1}</td>
                      <td data-label="Name">{value.name}</td>
                      <td data-label="Price">$ {value.price}</td>
                      <td data-label="Category">{value.category}</td>
                      <td data-label="Company">{value.company}</td>

                      <td data-label="Action">
                        {<EditIcon color='primary' className='edit' onClick={() => handleEdit(value._id)} />}

                        {<DeleteForeverIcon color='error' className='delete' onClick={() => handleDelete(value._id)}
                        />}
                      </td>
                    </tr>
                  )
                  :
                  <tr>
                    <td style={{ border: "none", fontSize: "40px", fontWeight: "bold" }} colSpan={'6'}>No data Found</td>
                  </tr>
            }
          </tbody>
        </Table>
      }
    </div>
  )
}
export default ProductList;