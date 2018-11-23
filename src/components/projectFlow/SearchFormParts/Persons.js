import React from 'react'
import {Input} from 'react-materialize'

import {mainFormFillEvents} from '../../../events/events'

class Persons extends React.Component{

handlePersons=(e)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name,value:parseInt (e.target.value)})
}

render (){
    console.log('PERSONS RENDER')

    let options = [1,2,3]
    let optionsA =options.map((el, i)=>{
        return(
            <option key={i} selected={(options[i] === this.props.adultValue) ? true: false} value={el}>{el} взрослый</option>
        )
    })

    let options2 = [0,1,2,3]
    let optionsС =options2.map((el, i)=>{
        return(
            <option key={i} selected={(options2[i] ===  this.props.childrenValue) ? true: false} value={el}>{el} ребенок</option>
        )
    })

    return (
        <div>
            
            <Input 
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