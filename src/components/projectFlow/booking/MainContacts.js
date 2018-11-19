import React, { PureComponent } from 'react'
import {Row, Input} from 'react-materialize'


export default class MainContacts extends PureComponent {

  render() {
    
    return (
      <div>
       <Row>
      <p className='col s12 black-text flow-text'>Контакты</p>
        <Input 
        s={6} 
        name='contactTel'
        label="Телефон" 
        labelClassName='black-text'
        icon='contact_phone'
        onChange={(e)=>{this.props.handleChange(e, null)}}
         ></Input>
        <Input 
        s={6} 
        name='contactAdress'
        label="Адрес" 
        labelClassName='black-text'
        icon='home'
        onChange={(e)=>{this.props.handleChange(e, null)}}
        ></Input>
      </Row>
      </div>
    )
  }
}
