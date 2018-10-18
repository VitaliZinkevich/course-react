import React, { Component } from 'react';
import {Input, Navbar, NavItem, Button, Row} from 'react-materialize'
import './NightsForm.css'

// + 1 ночь к расчетам


class NightsForm extends Component {
  
  handleNights=(e, ind)=>{
    console.log (e.target.name)
    console.log (e, ind)

  }

  render() {

    let startArray = []
    for (let i = 1; i!==22;  i++) {
      startArray.push(i)
    }

    let formView = startArray.map ((el, ind)=>{
      return (
        
        <div key={ind}>
        <Input 
        name='nights' 
        type='checkbox' 
        labelClassName='black-text' 
        label={el} 
        onChange={(e)=>{this.handleNights(e,ind)}}/>
        </div>
        
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
