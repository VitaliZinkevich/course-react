import React, { PureComponent } from 'react'
import {Row, Input} from 'react-materialize'
import { relativeTimeThreshold } from 'moment';
export default class MainContacts extends PureComponent {

    state = {
        contactTel:'' ,
        contactEmail:'',
    }

    handleChange=(e)=>{
        
        this.setState ({[e.target.name]: e.target.value})

    }

  render() {
      console.log (this.state)
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
        onChange={this.handleChange}
        value={this.state.contactTel} ></Input>
        <Input 
        s={6} 
        name='contactEmail'
        label="Электронная почта" 
        labelClassName='black-text'
        icon='contact_mail'
        onChange={this.handleChange}
        value={this.state.contactEmail}></Input>
      </Row>
      </div>
    )
  }
}
