import React, { PureComponent } from 'react'
import {Input, Button, Row, Col,Icon } from 'react-materialize'


export default class TouristhtmlForm extends PureComponent {


  render() {
   
    //console.log (this.state)
    return (
  
    <div className='touristForm'>
     
      <Row>
      <p className='col s12 black-text flow-text'>Турист номер {this.props.index+1}</p>
        <Input s={6} 
        label="Имя"
        name='firstName'
        labelClassName='black-text'
        icon='account_circle'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}></Input>
        <Input 
        s={6} 
        name='lastName'
        label="Фамилия"
        labelClassName='black-text'
        icon='account_circle'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}
        ></Input>
      </Row>

      <Row>
      <p className='col s12 black-text flow-text'>Паспорт</p>
        <Input s={4} 
        name='passSeries'
        label="Серия" 
        labelClassName='black-text'
        icon='perm_identity'
        labelClassName='black-text'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}>
        
        </Input>

        <Input s={4} 
        name='passNumber'
        label="Номер"
        labelClassName='black-text'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}/>

        <Input
        s={4} 
        name=''
        label="Действителен до"
        name='passValidTill' 
        type='date' 
        labelClassName='black-text'
        readOnly
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}
        ></Input>
   
      </Row>

    </div>
      
    )
  }


}

 