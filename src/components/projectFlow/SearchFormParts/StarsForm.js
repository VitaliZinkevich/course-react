import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Input} from 'react-materialize'

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
        onChange={()=>{}}
        type='select' 
        label="Stars" >
            {startsOptions}
        </Input>
    )
  }
}

export default StarsForm
