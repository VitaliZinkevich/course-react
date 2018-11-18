
import React, { PureComponent } from 'react'
import {Input, Button, Modal} from 'react-materialize'
import axios from 'axios'

export default class Contacts extends PureComponent {

state={
  email:'',
  message:'',
  openModal:false,
  send:false
}

handleChange=(e)=>{

  this.setState ({[e.target.name]: e.target.value})

}

doneMessage=()=>{

  if (this.state.email === '' || this.state.message === '') {
    window.Materialize.toast ('Заполните все поля', 2000)
  } else {
    this.setState ({send: true})
    axios.post ('http://localhost:8080/contactmessage', {email: this.state.email, message: this.state.message}).then(
      (res)=>{ 
        this.setState ({openModal: true})
      }
    )
  }
}


  render() {
    
    return (

      <main >
        <div className='row'>

            <div className='col s6'>
            <p className="flow-text">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </p>
            </div>

            <div className='col s6 contactForm'>

            
            {this.state.send === false ? (<div className='contactForm'>
            <p className="flow-text">Спросить</p>
            <Input
              name='email'
              icon='email'
              label='Почта'
              onChange={this.handleChange}
              ></Input>

              <Input type='textarea' 
              icon='message'
              label='Сообщение'
              name='message'
              onChange={this.handleChange}/>
              
              <Button
              id='sendMsg'
              onClick={this.doneMessage}>Отправить
              </Button></div>): null}
              

            </div>
        </div>
        <Modal
          open={this.state.openModal}
          header='Спасибо'
          actions={null}
          optons={{inDuration:100}}>
          Ваше сообщение получено
        </Modal>
    </main>
    )
  }
}
