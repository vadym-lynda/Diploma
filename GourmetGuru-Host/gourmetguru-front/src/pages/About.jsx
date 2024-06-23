import Header from '../components/Header'
import React,{useContext} from 'react'
import { AuthContext } from '../api/AuthContext';


function About() {
  const { isAuthorised } = useContext(AuthContext);
  return(
    <Header isAuthorised={isAuthorised} />
  )
}

export default About;