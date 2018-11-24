import React, { PureComponent } from 'react'

import {Input} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

import PropTypes from 'prop-types';

export class StarsForm extends PureComponent {
    
    static propTypes={
        stars:PropTypes.string,
    }

  render() {
    let starsTypes = [ 'Любой','2','3','4','5']
    let startsOptions = starsTypes.map ((el,index)=>{
        return (
            <option key = {index} selected={starsTypes[index] === this.props.stars ? true: false} value={el}>{el}</option>
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
