import './App.css';
import Home from './pages/Home';
import About from "./pages/About";
import Login from './pages/Login'
import Register from './pages/Register'
import Recipe from './pages/Recipe'
import { Route, Routes } from 'react-router-dom';
import React,{useState,useContext} from 'react'
import Recipes from './pages/Recipes';
import UserAccount from './pages/userAccount'


function App() {

  return (
    <>
      <Routes>
      <Route path="/recipe" element={<Recipe/>} />
      <Route path='/' element={<Home/>}/>
      <Route path='/Recipes' element={<Recipes/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/UserAccount' element={<UserAccount/>}/>
      <Route path='/About' element={<About/>}/>
      </Routes>  
   
  
 
</>

  );
}

export default App;
