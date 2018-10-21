import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Input, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'
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
        onChange={(e)=>{
            mainFormFillEvents.emit ('handleSearchForm', {
                name: e.target.name,
                value:e.target.value})
        }}
        icon={<Icon>free_breakfast</Icon>}
        name='foodType'
        s={12} type='select' label="Food" >
            {foodOptions}
        </Input>
    )
  }
}

export default FoodForm
