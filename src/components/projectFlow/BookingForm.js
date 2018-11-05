import React, { PureComponent } from 'react'
import axios from 'axios'
import TouristForm from './booking/TouristForm'
import OrderDetailes from './booking/OrderDetailes'
import MainContacts from './booking/MainContacts'
import {Input, Button} from 'react-materialize'


export default class BookingForm extends PureComponent {
  
  constructor(props) {
    super(props);
  
    let number = parseInt (this.props.location.state.adults)+ parseInt (this.props.location.state.children)
   
    let touristDataforState = []
    for (let i = 0; i < number; i++) {
      touristDataforState.push({
        firstName: '',
        lastName:'',
        passSeries:'',
        passNumber:'',
        passValidTill:'',
        

      })
    }


    this.state = { ...this.props.location.state,
      touristsData: touristDataforState, 
      contactTel:'', 
      contactEmail:'',
      validationErrors: [],
      message: ''}
  }



  saveOrder=()=>{
    
   

  let canSendToServer = this.validate (this.state)

  if (canSendToServer)

    axios.post('http://localhost:8080/neworder', {
    hotel: this.state.hotel.name,
    room: this.state.room,
    date: this.state.date,
    night: this.state.night,
    adults:this.state.adults,
    children:this.state.children,
    contactEmail:this.state.contactEmail,
    contactTel:this.state.contactTel,
    touristsData:this.state.touristsData

  }).then ((res)=>{
    this.setState({message :res.data})
  })


  }

  handleChange=(e, index=null)=>{
  

    if (index !== null ) {

      let newTouristData = [...this.state.touristsData]
      newTouristData[index][e.target.name] = e.target.value

      this.setState ({touristsData: newTouristData})
    } else {
      this.setState ({[e.target.name]: e.target.value})
    }

   
}

validate=(state)=>{

  let errors = [];

  if (this.state.contactTel === '' || this.state.contactEmail === '') {
    errors.push ('Заполните все контактные данные')
  } 


  this.state.touristsData.forEach((el,index)=>{

      if ( el.firstName=== '' ||
        el.lastName===''||
        el.passSeries===''||
        el.passNumber ===''||
        el.passValidTill ===''
      )  {
        errors.push(`Заполните все данные на туриста ${index+1}`)
      }



  })



  if (errors.length !== 0 ) {
        
        this.setState ({validationErrors: errors}, ()=>{

          if (this.state.validationErrors.length !== 0) {

            for (let e of this.state.validationErrors) {
                window.Materialize.toast(e, 3000)
            }

        }
        return false
        
      })
      } else {
        this.setState ({validationErrors: errors})
        return true
      }

  }

  
  render() {
  // console.log(this.props)
  //console.log(  this.props.location.state)
  
  let formForEachTouristData = [];
  let number = parseInt (this.state.adults)+ parseInt (this.state.children)

  //console.log(number)
  for (let i = 0; i<number; i++) {
    formForEachTouristData.push(<TouristForm handleChange={this.handleChange} key={i} index={i}/>)
    
  }



    return (

      <main>
          

              <div className='row'>
                <div className='col s5'>
                <p className='black-text'>Статус заявки</p>
                <Input s={12} type='select' disabled>
                  <option  value='1'>Бронирование</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Input>
                </div>

                <div className='col s5'>
                <p className='black-text'>Статус оплаты</p>
                <Input s={12} type='select' disabled>
                  <option  value='1'>Неоплачено</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Input>
              </div>

              <div className='col s2'>
                <p className='black-text'>Стоимость тура</p>
                <div>{(parseInt (this.state.room.price.adult) * parseInt (this.state.adults) + 
                parseInt (this.state.room.price.children)* parseInt (this.state.children))*parseInt (this.state.night) }</div>
              </div>
              </div>



              <div>
                <p className="black-text flow-text">Проживание</p>
                <OrderDetailes
                hotel={this.state.hotel}
                room={this.state.room}
                night={this.state.night}
                date={this.state.date}
                ad={this.state.adults}
                ch={this.state.children}/>

              </div>
                  <MainContacts
                  handleChange={this.handleChange}
                  />
            
            {formForEachTouristData}
              
              {this.state.message === ''? null: (<div className= 'center green-text'>

              {this.state.message}
              
              
              </div>)}
              
              <Button
              
              className="saveButton right green"
              waves='green'
              onClick={this.saveOrder}
              >Забронировать</Button>

         

      </main>
      
       
  
          
    )
  }
}
