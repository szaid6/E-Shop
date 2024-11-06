import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/layouts/Layout';
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import RequireAuth from './middleware/RequireAuth';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Productdetail from 'pages/productdetail/Productdetail';
import Order from 'pages/order/Order';
import AddProduct from './pages/product/AddProduct';
import UpdateProduct from './pages/product/UpdateProduct';
import RequireAdmin from 'middleware/RequireRole';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/productdetail/:productId' element={<Productdetail />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />} >
            <Route path='/order/:quantity/:productId' element={<Order />} />
            <Route element={<RequireAdmin allowedRoles={["ADMIN"]} />}>
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/update-product/:productId' element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
