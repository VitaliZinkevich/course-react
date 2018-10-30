import React, { PureComponent } from 'react';
import {Input, Navbar, NavItem, Button, Row} from 'react-materialize'


import {mainFormFillEvents} from '../../../events/events'

// + 1 ночь к расчетам


class NightsForm extends PureComponent {
  
  handleNights=(e, ind)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name, value: ind+1})
  }

  render() {

    let startArray = []
    for (let i = 1; i!==22;  i++) {
      startArray.push(i)
    }

    let formView = startArray.map ((el, ind)=>{
      
      let isChecked = (this.props.valueNights.indexOf (ind+1) !== -1) ? true : false;
      // console.log("RENDER NIGHTS")
      // console.log((isChecked))
      
      if (isChecked) {

        return (
          
          <div key={ind.toString()+this.props.valueNights.toString()}>
          <Input
          
          checked
          name='nights' 
          type='checkbox' 
          labelClassName='black-text' 
          label={el} 
          onChange={(e)=>{this.handleNights(e,ind)}}/>
          </div>
          
        )

      } else {

        return (
        
          <div key={ind.toString()+this.props.valueNights.toString()}>
          <Input
          
          
          name='nights' 
          type='checkbox' 
          labelClassName='black-text' 
          label={el} 
          onChange={(e)=>{this.handleNights(e,ind)}}/>
          </div>
          
        )
      }
     
      

    })

      return (

      <div className='nights'>
        {formView}
      </div>
    );
  }
}

export default NightsForm;
