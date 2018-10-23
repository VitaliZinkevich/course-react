import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Input, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

export class FoodForm extends Component {

   
  
   render() {

    let foodTypes = ['Любое', 'Без питания','Завтраки','Завтрак и ужин','Завтрак, обед и ужин', 'Все включено']
    let foodTypesvalues = ['Any', 'AO','BB','HB','FB', 'ALL']


    let foodOptions = foodTypes.map ((el, index)=>{
        return (
            <option key = {index} value={foodTypesvalues[index]}>{el}</option>
        )
    })

    return (
        <Input 
        onChange={(e)=>{
            mainFormFillEvents.emit ('handleSearchForm', {
                name: e.target.name,
                value:e.target.value})
        }}
        icon='free_breakfast'
        name='foodType'
        s={12} type='select' label="Питание" >
            {foodOptions}
        </Input>
    )
  }
}

export default FoodForm