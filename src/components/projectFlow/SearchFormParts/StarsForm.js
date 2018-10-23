import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Input, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

export class StarsForm extends Component {
//   static propTypes = {

//   }

  render() {
    let starsTypes = [ 'Любой','2','3','4','5']
    let startsOptions = starsTypes.map ((el,index)=>{
        return (
            <option key = {index} value={el}>{el}</option>
        )
    })

    return (
        <Input s={12} 
        onChange={(e)=>{
            mainFormFillEvents.emit ('handleSearchForm', {
                name: e.target.name,
                value:e.target.value})
        }}
        name='starsType'
        type='select' 
        label="Категория отеля"
        icon='star'
        >
        
            {startsOptions}
        </Input>
    )
  }
}

export default StarsForm
