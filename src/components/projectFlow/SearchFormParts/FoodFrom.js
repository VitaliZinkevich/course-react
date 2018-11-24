import React, { PureComponent } from 'react'
import {Input} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'
import PropTypes from 'prop-types';

export class FoodForm extends PureComponent {

    static propTypes = {
        foodType:PropTypes.string,
       
    }

  render() {

    let foodTypes = ['Любое', 'Без питания','Завтраки','Завтрак и ужин','Завтрак, обед и ужин', 'Все включено']
    let foodTypesvalues = ['Any', 'AO','BB','HB','FB', 'ALL']


    let foodOptions = foodTypes.map ((el, index)=>{
        return (
            <option key = {index} selected={foodTypesvalues[index] === this.props.foodValue ? true: false} value={foodTypesvalues[index]}>{el}</option>
        )
    })
    
    return (
    <div > <Input 
        
        onChange={(e)=>{
            mainFormFillEvents.emit ('handleSearchForm', {
                name: e.target.name,
                value:e.target.value})
        }}
        icon='free_breakfast'
        name='foodType'
        s={12} 
        type='select' 
        label="Питание"
        >
            {foodOptions}
        </Input>
        
    </div>
       

    )
  }
}

export default FoodForm
