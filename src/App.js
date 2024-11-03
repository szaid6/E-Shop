import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import RequireAuth from './middleware/RequireAuth';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<RequireAuth />}>

          {/* <Route element={<RequireRole allowedRoles={["ADMIN"]} />}>
            <Route path='/' element={<Navigate to="/admin" replace={true} />} />
            <Route path='admin' element={<Layout />}>
              <Route path='dashboard' element={<DashBoard />} />
              <Route path='profile' element={<Outlet />} />
              <Route path='books' element={<Outlet />} >
                <Route index element={<Books />} />

                <Route path=':id' element={<BookDetails />} />
                <Route path='add' element={<AddEditBook />} />
                <Route path='edit/:id' element={<AddEditBook />} />
              </Route>
              <Route path='issue-books' element={<IssueBook />} />
              <Route path='issued-books' element={<IssuedBooks />} />
              <Route path='return-books' element={<ReturnBook />} />
              <Route path='users' element={<Outlet />} >
                <Route index element={<Users />} />
                <Route path='add' element={<AddEditUser />} />
                <Route path='edit/:id' element={<AddEditUser />} />
              </Route>
            </Route>
          </Route> */}

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;