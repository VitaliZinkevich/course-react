import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Input, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

export class StarsForm extends Component {
//   static propTypes = {

//   }

  render() {

    let startsOptions = this.props.stars.map ((el,index)=>{
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
        label="Stars"
        icon={<Icon>star</Icon>}
        >
        
            {startsOptions}
        </Input>
    )
  }
}

export default StarsForm
