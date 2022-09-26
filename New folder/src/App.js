import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from './Components/Common/Navbar';
import Alluser from './Pages/Alluser';
import Adduser from './Pages/Adduser';
import Home from './Pages/Edit';
import Indie from './Pages/Indie';
import Api from './Pages/Api';


function App() {

  return (
  
    
    <div >
      <Router>
<Navbar/>
        <Routes>
          {/* <Route path='/' /> */}
          <Route path='/edit/:id' element={<Home/>}/>
          <Route path='/all-user' element={<Alluser/>}/>
          <Route path='/all-user/:id' element={<Indie/>}/>
          <Route path='/api' element={<Api/>}/>
         
          <Route path='/add-user' element={<Adduser title="Enter your details"/>}/>
        </Routes>
      </Router> 
    </div>
  ); 
}

export default App;




