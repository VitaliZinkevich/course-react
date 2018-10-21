import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Input} from 'react-materialize'

export class FoodForm extends Component {
//   static propTypes = {

//   }

  render() {

    let foodOptions = this.props.food.map ((el, index)=>{
        return (
            <option key = {index} value={el}>{el}</option>
        )
    })

    return (
        <Input 
        onChange={()=>{}}
        s={12} type='select' label="Food" >
            {foodOptions}
        </Input>
    )
  }
}

export default FoodForm
