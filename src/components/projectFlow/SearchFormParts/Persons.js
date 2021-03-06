import React from 'react'
import {Input} from 'react-materialize'

import {mainFormFillEvents} from '../../../events/events'

import PropTypes from 'prop-types';


class Persons extends React.Component{

static propTypes={
    childrenValue: PropTypes.number,
    adultValue:PropTypes.number
}

handlePersons=(e)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name,value:parseInt (e.target.value)})
}

render (){
    // console.log('PERSONS RENDER')
    
    let options = [1,2,3]
    let optionsA =options.map((el, i)=>{
        //selected={(options[i] === this.props.adultValue) ? true: false}
        return(
            <option key={i} value={el}>{el} взрослый</option>
        )
    })

    let options2 = [0,1,2,3]
    let optionsС =options2.map((el, i)=>{
        //selected={(options2[i] ===  this.props.childrenValue? true: false})
        return(
            <option key={i} value={el}>{el} ребенок</option>
        )
    })

    return (
        <div>
            
            <Input 
            value={this.props.adultValue.toString()}
            icon='person'
            name ='adults'
            s={6} 
            type='select' 
            label="Взрослых" 
            labelClassName='black-text'
            onChange={this.handlePersons}
            >
                {optionsA}
            </Input>
            
            <Input 
            value = {this.props.childrenValue.toString()}
            name ='children'
            icon='child_care'
            s={6} 
            type='select' 
            label="Детей" 
            labelClassName='black-text'
            onChange={this.handlePersons}
            
            >
                {optionsС}
    
                
            </Input>
        </div>
            
        
    )
}

}

export default Persons