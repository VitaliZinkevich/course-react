import React, { PureComponent } from 'react'
import {Input, Button, Row, Col,Icon } from 'react-materialize'


export default class TouristhtmlForm extends PureComponent {


  state = {
    firstName: '',
    lastName:'',
    passSeries:'',
    passNumber:'',
    passValidTill:'',
    contactTel:'',
    contactEmail:'',
  }

  handleChange=(e)=>{
    console.log (e.target.value)
    this.setState ({[e.target.name]: e.target.value})

}

  render() {
   
    //console.log (this.state)
    return (
  
    <div className='touristForm'>
     
      <Row>
      <p className='col s12 black-text flow-text'>Турист номер {this.props.index}</p>
        <Input s={6} 
        label="Имя"
        name='firstName'
        labelClassName='black-text'
        icon='account_circle'
        onChange={this.handleChange}></Input>
        <Input 
        s={6} 
        name='lastName'
        label="Фамилия"
        labelClassName='black-text'
        icon='account_circle'
        onChange={this.handleChange}
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
        onChange={this.handleChange}>
        
        </Input>

        <Input s={4} 
        name='passNumber'
        label="Номер"
        labelClassName='black-text'
        onChange={this.handleChange}/>

        <Input
        s={4} 
        name=''
        label="Действителен до"
        name='passValidTill' 
        type='date' 
        labelClassName='black-text'
        readOnly
        onChange={this.handleChange}
        ></Input>
   
      </Row>




        
       
        
    </div>
      
    )
  }
}
