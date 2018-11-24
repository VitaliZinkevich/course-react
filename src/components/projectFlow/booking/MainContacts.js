import React, { PureComponent } from 'react'
import {Row, Input} from 'react-materialize'
import PropTypes from 'prop-types';

export default class MainContacts extends PureComponent {
  
  static propTypes ={
    handleChange: PropTypes.func.isRequired
  }

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
