
import React, { PureComponent } from 'react'
import {Input, Button, Modal} from 'react-materialize'
import axios from 'axios'
import {API} from 'aws-amplify'


export default class Contacts extends PureComponent {

state={
  email:'',
  message:'',
  openModal:false,
  send:false
}

componentDidMount(){
  window.scrollTo(0, 0)
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
callProtected = ()=>{
  API.get('testApiCall', '')
    .then (data=> console.log(data))
    .catch (err => console.log(err))
}


  render() {
    
    return (

      <main>
        <div className='row'>

            <div className='col s6'>
            
                
                <div className="card horizontal z-depth-4 margin-top-50">
               
                  <div className="card-stacked">
                    <div className="card-content">

                    <div>  <i className="material-icons Large">assignment_ind</i><p>Vitali Zinkevich</p></div>
                    <div>  <i className="material-icons Large">email</i> <p>vitalizinkevich@gmail.com</p></div>
                    <div>  <i className="material-icons Large">contact_phone</i> <p>+375 29 338 00 91</p></div>
                    <div>  <i className="material-icons Large">link</i> <p><a href='https://www.linkedin.com/feed/?trk=onboarding-landing'>I am at linkedIn</a></p></div>
                    <button  
                onClick={this.callProtected} 
                className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-top-25 btn-large textstrong'  >
                защищенный роут
                </button>
                    </div>
                  </div>
                </div>
                
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
              onClick={this.doneMessage}
              className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-top-25 textstrong'>Отправить
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
