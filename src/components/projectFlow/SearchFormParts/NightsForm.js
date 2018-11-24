import React, { PureComponent } from 'react';
import {Input} from 'react-materialize'


import {mainFormFillEvents} from '../../../events/events'

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
// + 1 ночь к расчетам дней


class NightsForm extends PureComponent {
  
  static propTypes={
    valueNights:ImmutablePropTypes.listOf(PropTypes.number)
  }


  handleNights=(e, ind)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name, value: ind+1})
  }

  render() {
    console.log("RENDER NIGHTS")
    let startArray = []
    for (let i = 1; i!==22;  i++) {
      startArray.push(i)
    }

    let formView = startArray.map ((el, ind)=>{
      
      let isChecked = (this.props.valueNights.indexOf (ind+1) !== -1) ? true : false;
    
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
