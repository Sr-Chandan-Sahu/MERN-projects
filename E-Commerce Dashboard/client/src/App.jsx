import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'
function App() {

  return (
    <div className='text-center'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route  element={<PrivateComponent/>}>
            <Route path='/' element={<ProductList/>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/profile' element={<h1>Welcome to profile component</h1>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  )
}

export default App
