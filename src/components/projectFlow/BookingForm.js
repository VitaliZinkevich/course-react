import React, { PureComponent } from 'react'
import axios from 'axios'
import TouristForm from './booking/TouristForm'
import OrderDetailes from './booking/OrderDetailes'
import MainContacts from './booking/MainContacts'
import {Input, Button, Modal} from 'react-materialize'
//import { Route, Redirect } from 'react-router'

import {Link} from "react-router-dom"

import {reNewOrders} from '../../redux/authAction'

import { connect } from 'react-redux'



 class BookingForm extends PureComponent {
  
  constructor(props) {
    super(props);
    
    let number;
    let touristDataforState
    

    if (this.props.buyOptions === null) {
      
      // нет этих пропсов с опциями. вход не из прайс листа
      // this.props.history.push ('/')
           
    } else {
      // console.log(this.props.buyOptions.get ('adults'))
      number = parseInt (this.props.buyOptions.get ('adults'))+ parseInt (this.props.buyOptions.get ('children'))
   
      touristDataforState = []
      for (let i = 0; i < number; i++) {
        touristDataforState.push({
          firstName: '',
          lastName:'',
          passSeries:'',
          passNumber:'',
          passValidTill:'',
          
  
        })
      }

    }

    this.state = {
      touristsData: touristDataforState, 
      contactTel:'', 
      contactAdress:'',
      validationErrors: [],
      openModal: false}
  }




saveOrder=()=>{

let canSendToServer = this.validate (this.state)

if (canSendToServer) {

  this.setState({openModal: true})

  axios.post('http://localhost:8080/neworder', {
  number:Math.floor(Math.random()*10000),
  hotel: this.props.buyOptions.getIn(['hotel', 'name']),
  room: this.props.buyOptions.getIn(['room', 'name']),
  date: this.props.buyOptions.getIn(['date']),
  night: this.props.buyOptions.getIn(['night']),
  adults:this.props.buyOptions.getIn(['adults']),
  children:this.props.buyOptions.getIn(['children']),
  contactAdress:this.state.contactAdress,
  contactTel:this.state.contactTel,
  touristsData:this.state.touristsData,
  statusConfirmed: 1,
  statusPayment: 1,

}).then ((res)=>{
  // redirect after done w order to main?
  setTimeout(()=>{
    this.setState({openModal: false}, ()=>{this.props.history.push('/myorders')})},3000)
    
  
  // re new orders dispath
  //this.props.dispath (reNewOrders(userName))
})}

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
  

  if (this.state.contactTel === '' || this.state.contactAdress === '') {
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
        
        
        
      })
      return false
      } else {
        this.setState ({validationErrors: errors})
        return true
      }

}

  
render() {

  
  let formForEachTouristData = [];

  if (this.props.buyOptions !== null)  {

    let number = parseInt (this.props.buyOptions.getIn(['adults']))+ parseInt (this.props.buyOptions.getIn(['children']))

    //console.log(number)
    for (let i = 0; i<number; i++) {
      formForEachTouristData.push(<TouristForm handleChange={this.handleChange} key={i} index={i}/>)
      
    }
  }
    
  
  



    return (

      <main>
          
        {this.props.buyOptions === null ? (<div className='center'>Оформление заявок только через прайс лист со страницы поиска<br/>  <Link to={`/`}>На страницу поиска </Link></div>) : (<div>
              <div className='row'>
                <div className='col s5'>
                <p className='black-text'>Статус заявки</p>
                <Input s={12} type='select' disabled>
                  <option value='1'>Бронирование</option>
                  <option value='2'>Подтверждено</option>
                  <option value='3'>Аннулировано</option>
                </Input>
                </div>

                <div className='col s5'>
                <p className='black-text'>Статус оплаты</p>
                <Input s={12} type='select' disabled>
                  <option value='1'>Неоплачено</option>
                  <option value='2'>Оплачено</option>
                  <option value='3'>Частично оплачено</option>
                </Input>
              </div>

              <div className='col s2'>
                <p className='black-text'>Стоимость тура</p>
                <div>{parseInt (this.props.buyOptions.getIn(['room', 'price', 'adult'])) * 
                parseInt (this.props.buyOptions.getIn(['adults'])) + 
                parseInt (this.props.buyOptions.getIn(['room', 'price', 'children']))* 
                parseInt (this.props.buyOptions.getIn(['children']))
                *parseInt (this.props.buyOptions.getIn(['night'])) }</div>
              </div>
              </div>



              <div>
                <p className="black-text flow-text">Проживание</p>
                <OrderDetailes
                hotel={this.props.buyOptions.getIn(['hotel', 'name'])}
                room={this.props.buyOptions.getIn(['room', 'name'])}
                night={this.props.buyOptions.getIn(['night'])}
                date={this.props.buyOptions.getIn(['date'])}
                ad={this.props.buyOptions.getIn(['adults'])}
                ch={this.props.buyOptions.getIn(['children'])}/>

              </div>
                  <MainContacts
                  handleChange={this.handleChange}
                  />
            
            {formForEachTouristData}
              
             
              
              <Button
              
              className="saveButton right green"
              waves='green'
              onClick={this.saveOrder}
              >Забронировать</Button>
              <Modal
                open={this.state.openModal}
                header='Спасибо'
                actions={null}>
                Спасибо. Заявка получена.
              </Modal>
         </div>)}
        

      </main>
      
       
  
          
    )
  }
}


let mapStateToProps = (state) => {
    
  return {
    buyOptions: state.bookingReducer.get ('buyOptions'),
    userName: state.auth.get ('userName')
    
    }
}


export default connect(mapStateToProps)(BookingForm)