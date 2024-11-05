import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/layouts/Layout';
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import RequireAuth from './middleware/RequireAuth';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Productdetail from 'pages/productdetail/Productdetail';

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

          {/* <Route element={<RequireRole allowedRoles={["ADMIN"]} />}>
            <Route path='/' element={<Navigate to="/admin" replace={true} />} />
          </Route> */}

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;