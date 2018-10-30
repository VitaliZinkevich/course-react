import React from 'react'
import {Input, Navbar, NavItem, Button, Row, Icon} from 'react-materialize'

import {mainFormFillEvents} from '../../../events/events'

class Persons extends React.Component{

handlePersons=(e)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name,value:parseInt (e.target.value)})
}

// componentWillReceiveProps (newProps){
//     if (newProps.adultValue!=this.props.adultValue && newProps.childrenValue!=this.props.childrenValue) {
//         this.render()
//     }
// }

render (){
    console.log('PERSONS RENDER')
    // console.log(typeof this.props.adultValue)
    // console.log(typeof this.props.childrenValue)
    let options = [1,2,3]
    let optionsA =options.map((el, i)=>{
        return(
            <option key={i} selected={options[i] === this.props.adultValue} value={el}>{el} взрослый</option>
        )
    })

    let options2 = [0,1,2,3]
    let optionsС =options2.map((el, i)=>{
        return(
            <option key={i} selected={options2[i] ===  this.props.childrenValue} value={el}>{el} ребенок</option>
        )
    })
    //console.log(this.props)
    //this.props.adultValue.toString()+this.props.childrenValue.toString()
    // key={this.props.adultValue}
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