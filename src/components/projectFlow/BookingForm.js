import React, { PureComponent } from 'react'

import TouristForm from './booking/TouristForm'
import OrderDetailes from './booking/OrderDetailes'
import MainContacts from './booking/MainContacts'
import {Input, Button} from 'react-materialize'


export default class BookingForm extends PureComponent {
  
  constructor(props) {
    super(props);
 
    this.state = { ... this.props.location.state, touristsData: []};
  }


  saveOrder=()=>{
    console.log ('SAVE BUTTON')

  }

  
  render() {
  // console.log(this.props)
  //console.log(  this.props.location.state)

  let formForEachTourists = []
  let number = parseInt (this.state.adults)+ parseInt (this.state.children)

  //console.log(number)
  for (let i = 1; i<=number; i++) {
     formForEachTourists.push(<TouristForm key={i} index={i}/>)
  }
 //console.log(formForEachTourists)

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
                  <MainContacts/>
            {formForEachTourists}
              
              
              <Button
              className="saveButton"
              waves='green'
              onClick={this.saveOrder}
              >Сохранить</Button>

         

      </main>
      
       
  
          
    )
  }
}
