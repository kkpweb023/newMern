import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './Services/NavBar';
import ProductList from './Components/Home/ProductList';
import UpdateProduct from './Components/Update/UpdateProduct';
import Profile from './Components/Profile/Profile';
import Footer from './Services/Footer';
import SignUp from './Components/SignUp/SignUp';
import PrivateComp from './Services/PrivateComp';
import Login from './Components/Login/Login';
import ChangePass from './Components/Profile/ChangePass';
import AddProduct from './Components/Products/AddProduct';
import ResetPass from './Components/Login/ForgotPass/ResetPass';
import ForgotPass from './Components/Login/ForgotPass/ForgotPass';
import SixDigit from './Components/Login/ForgotPass/SixDigit';



const App = () => {
    return (
        <div style={{ position: "relative" }}>
            <NavBar />
            <Routes basename="/newMern">
                <Route element={<PrivateComp />}>
                    <Route path='/' element={<ProductList />} />
                    <Route path='/add' element={<AddProduct />} />
                    <Route path='/update/:id' element={<UpdateProduct />} />
                    <Route path='/logout' element={'Logout'} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/changePassword' element={<ChangePass />} />
                </Route>
                
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/login' element={<Login />} />

                <Route path='/forgotPass' element={<ForgotPass />} />
                <Route path='/sixDigit/:id' element={<SixDigit />} />
                <Route path='/resetPass/:id' element={<ResetPass />} />

            </Routes>
            <Footer />
        </div>
    )


}
export default App;


