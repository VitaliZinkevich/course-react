import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import './NightsForm.css';

class NightsForm extends Component {
  
  

  render() {
    let startArray = []
    for (let i = 1; i!==22;  i++) {
      startArray.push(i)
    }

    let formView = startArray.map ((el, ind)=>{
      return (
        
        <p key={ind}>
        <label >
        <input type="checkbox"/>
        <span className='darken-3'>{ind+1}</span>
        </label>
        </p>
        
      )
      

    })

      return (

      <div className='nights'>
        {formView}
      </div>
    );
  }
}

export default NightsForm;
