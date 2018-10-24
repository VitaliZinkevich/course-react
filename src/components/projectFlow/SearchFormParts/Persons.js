import React from 'react'
import {Input, Navbar, NavItem, Button, Row, Icon} from 'react-materialize'

import {mainFormFillEvents} from '../../../events/events'

class Persons extends React.Component{

handlePersons=(e)=>{
    mainFormFillEvents.emit ('handleSearchForm' , {name: e.target.name,value:e.target.value})
}

render (){
    return (
        <div>
            
            <Input 
            icon='person'
            name ='adults'
            s={6} 
            type='select' 
            label="Взрослых" 
            labelClassName='black-text'
            onChange={this.handlePersons}>
                <option value='1'>1 взрослый</option>
                <option value='2'>2 взрослых</option>
                <option value='3'>3 взрослых</option>
            </Input>

            <Input 
            name ='children'
            icon='child_care'
            s={6} 
            type='select' 
            label="Детей" 
            labelClassName='black-text'
            onChange={this.handlePersons}
            value={this.props.children.toString()}>
                <option value='0'> 0 </option>
                <option value='1'> 1 ребенок</option>
                <option value='2'> 2 ребенка</option>
                <option value='3'> 3 ребенка</option>
                
            </Input>
        </div>
            
        
    )
}

}

export default Persons