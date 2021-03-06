import React, { PureComponent } from 'react'
import {Input, Button, Modal, Row, Col} from 'react-materialize'

import { API } from "aws-amplify";
import { connect } from 'react-redux'
import {sendContactForm} from '../../redux/contactActions'

import {Preloader} from 'react-materialize'
// import { s3Upload } from "../../libs/awsLib";
// import amplifyConfig from '../../amplify.config'

class Contacts extends PureComponent {

file = null;

state = {
  email:'',
  message:'',
  openModal:false,
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
    this.setState ({openModal: true})
    this.props.dispatch (sendContactForm ({email: this.state.email, message: this.state.message})).then(
      (res)=>{ 
        this.setState ({openModal: false})
      }
    )
  }

}

// handleFileChange=(event)=>{
//   this.file = event.target.files[0];
// }

// handleUploadFile = async (event)=>{
//   event.preventDefault();
  
//   if (this.file && this.file.size > amplifyConfig.MAX_ATTACHMENT_SIZE) {
//     alert(`Please pick a file smaller than ${amplifyConfig.MAX_ATTACHMENT_SIZE/1000000} MB.`);
//     return;
//   }
  
//   try {
//     await s3Upload(this.file).then (res=>console.log(res))
//     // this.props.history.push("/");
//   } catch (e) {
//     alert(e);
//   }
// }
contactForm = ()=>{
  return (
    <div className='row'>

    <div className='col s6'>
    
        
        <div className="card horizontal z-depth-4 margin-top-50">
       
          <div className="card-stacked">
            <div className="card-content">

            <div>  <i className="material-icons Large">assignment_ind</i><p>Vitali Zinkevich</p></div>
            <div>  <i className="material-icons Large">email</i> <p>vitalizinkevich@gmail.com</p></div>
            <div>  <i className="material-icons Large">contact_phone</i> <p>+375 29 338 00 91</p></div>
            <div>  <i className="material-icons Large">link</i> <p><a href='https://www.linkedin.com/feed/?trk=onboarding-landing'>I am at linkedIn</a></p></div>
            </div>
            {/* <>
              <input 
                  onChange={this.handleFileChange}
                  type='file'
                  name="uploadVauch"
                  accept="image/png, image/jpeg" />
              <button
                  onClick={this.handleUploadFile}
                  className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-arround textstrong btn-small'
                >Загрузить ваучер</button>
            </> */}
          </div>
        </div>
        
    </div>
  
  <div className='col s6 contactForm'>
  {this.props.send === false ? (<div className='contactForm'>
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
    </Button></div>): "Ваше сообщение отправлено"}
    
  {!!this.props.contactFormErrors ? <p> {this.props.contactFormErrors} </p>: null}
  </div>
  </div>)
}

pending = ()=>{
  return (
    <Row className='center'>
      <Col s={12}>
          <Preloader 
          className='margin-top-50'
          color='green'
          flashing/>
      </Col>
    </Row>
  )
}
  render() {
    
    return (
      <main>
            {this.state.openModal ?  this.pending() : this.contactForm()}
        {/* <Modal
          open={this.state.openModal}
          header='Спасибо'
          actions={null}
          optons={{inDuration:100}}>
         
          <Preloader 
                    color='green'
                    flashing/>
                    
        </Modal> */}
    </main>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    send: state.contacts.get ('send'),
    contactFormPending: state.contacts.get ('contactFormPending'),
    contactFormErrors: state.contacts.get ('contactFormErrors')
  }
}


export default  connect (mapStateToProps)(Contacts);