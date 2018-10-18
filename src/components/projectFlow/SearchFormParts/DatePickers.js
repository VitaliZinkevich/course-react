import React, { Component } from 'react';
import {Input, Navbar, NavItem, Button, Row, Col, Preloader} from 'react-materialize'

//event flow
import {mainFormFillEvents} from '../../../events/events'

class DatePickers extends  Component{

    handleChangeDates=(e, value)=>{
        mainFormFillEvents.emit('handleSearchFormChange', {name: e.target.name, value})
    }

render (){
    return (<div>
    <Input 
                        s={6} 
                        label='Start from'
                        labelClassName='black-text' 
                        name='dateFrom' 
                        type='date' 
                        onChange={(e, value)=>{this.handleChangeDates(e, value)}} 
                        />
                    
                        <Input
                        s={6} 
                        label='Start to'
                        labelClassName='black-text'  
                        name='dateFrom1' 
                        type='date' 
                        onChange={(e, value)=>{this.handleChangeDates(e, value)}} 
                        />
    </div>)}
}

export default DatePickers
