import React, { Component } from 'react';
import {Input, Navbar, NavItem, Button, Row} from 'react-materialize'


import {mainFormFillEvents} from '../../../events/events'

// + 1 ночь к расчетам


class NightsForm extends Component {
  
  handleNights=(e, ind)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name, value: ind+1})
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
        checked={ind == 0} 
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
