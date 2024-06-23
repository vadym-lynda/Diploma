import React, { useState,useContext } from 'react';
import { AuthContext } from '../../api/AuthContext';
import Header from '../../components/Header';

function UpdateItem() {
  const { isAuthorised } = useContext(AuthContext);

  return (
    <>
      <Header isAuthorised={isAuthorised} />

      <div className="register-form">
        <form className="form" action="">
          <h1 className="form-title">Update</h1>

          <div className="form-group">
            <input className="form-input" placeholder=" "/>
            <label className="form-label">Name</label>
          </div>
    <div className="form-group">
        <input className="form-input" placeholder=" "/>
        <label className="form-label">Type</label>
    </div>

    <div className="form-group">
        <input className="form-input" />
        <label className="form-label">Difficulty</label>
    </div>

    <div className="form-group">
        <input className="form-input"/>
        <label className="form-label" >Video URL</label>
    </div>

    <div className="form-group">
        <input className="form-input"/>
        <label className="form-label" >Country</label>
    </div>

    <div className="form-group">
        <input className="form-input"/>
        <label className="form-label" >description</label>
    </div>

    <button className="form-btn">Enter</button>
    
 </form>
</div>
    </>
    )
}

export default UpdateItem;