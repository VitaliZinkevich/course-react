import React, { PureComponent } from 'react'

import PropTypes from 'prop-types';
import {singleObjHotel, singleRoom} from './propTypes'

//import {singleObjHotel} from 
import TouristForm from './booking/TouristForm'
import OrderDetailes from './booking/OrderDetailes'
import MainContacts from './booking/MainContacts'
import {Input, Button, Modal, Row, Col, Preloader} from 'react-materialize'
//import { Route, Redirect } from 'react-router'

import {reNewOrders} from '../../redux/authAction'
import {delBookingOpt} from '../../redux/bookingAction'

import { connect } from 'react-redux'
import {saveOrder} from '../../redux/bookingAction'


 class BookingForm extends PureComponent {
  
  // date:date,
  // night:night,
  // hotel:hotel.toJS(), 
  // room:room.toJS(), 
  // adults:this.props.adults, 
  // children:this.props.children,

  static propTypes = {
    
    buyOptions: PropTypes.oneOfType ([
      PropTypes.shape(),
      PropTypes.shape({
        date:PropTypes.string,
        night:PropTypes.number,
        hotel: singleObjHotel , 
        room:singleRoom, 
        adults:PropTypes.number, 
        children:PropTypes.number,
       
    })
    ]) ,
    userName: PropTypes.string
  }

  constructor(props) {
    super(props);
    
    let number;
    let touristDataforState
    

    if (this.props.buyOptions === null) {
             
    } else {
      number = parseInt (this.props.buyOptions.get ('adults'))+ 
      parseInt (this.props.buyOptions.get ('children'))
   
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

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  saveOrder=(price)=>{

  let canSendToServer = this.validate (this.state)
//console.log(price)
  if (canSendToServer) {

  this.setState({openModal: true})

  let order = {
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
    price: price,
    paymentPart: 0,
    dateOfCreation: new Date(),
    orderCreatorEmail: this.props.userName
  }

  console.log(order)

  this.props.dispatch (saveOrder(order)).then ((res)=>{
  this.props.dispatch (reNewOrders())
  
  setTimeout(()=>{
    this.setState({openModal: false}, ()=>{
      this.props.history.push('/myorders')
      this.props.dispatch (delBookingOpt())})},1500)
    
  
})
.catch ((err)=>{
  console.log(err)
})
}

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

  unAuthEnter = ()=>{
    return (<div className='center'><h2>
    Оформление заявок только через прайс лист со страницы поиска</h2><br/>  
  <a href={`/`}><h3>На страницу поиска</h3></a></div>);
  }

  standartEnter = ()=>{
    let price
    if (this.props.buyOptions !== null) {
      price  = parseInt (((this.props.buyOptions.getIn(['room', 'price', 'adult'])) * 
      parseInt (this.props.buyOptions.getIn(['adults']))) + (
      parseInt (this.props.buyOptions.getIn(['room', 'price', 'children']))* 
      parseInt (this.props.buyOptions.getIn(['children'])))) * 
      parseInt (this.props.buyOptions.getIn(['night']))   
      //console.log(price)
    }

  let formForEachTouristData = [];

  if (this.props.buyOptions !== null)  {

  let number = parseInt (this.props.buyOptions.getIn(['adults']))+ parseInt (this.props.buyOptions.getIn(['children']))

  //console.log(number)
  for (let i = 0; i<number; i++) {
  formForEachTouristData.push(<TouristForm handleChange={this.handleChange} key={i} index={i}/>)
  }
  }
      return (<div>
        <div className='row'>
        <div className='col s12'>
        <p className="black-text flow-text">Статусы заявки</p></div>
      
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
            <option value='1'>Не оплачено</option>
            <option value='2'>Оплачено</option>
            <option value='3'>Частично оплачено</option>
          </Input>
        </div>

        <div className='col s2 center'>
          <p className='black-text'>Стоимость</p>
          <div>{price}</div>
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
        
      
      <div className='center'>
      <Button
      className='saveButton waves-effect white-text waves-light btn orange darken-2 z-depth-4 margin-top-25 textstrong'
      disabled={this.state.openModal === true}
      waves='green'
      onClick={()=>{this.saveOrder(price)}}
        >Забронировать
        </Button>
      </div>
        
        
        {/* <Modal
          open={this.state.openModal}
          header='Спасибо'
          actions={null}>
          <div className='center'>
          {this.props.saved ? 'true' : 'false'}
          <p>Заявка получена.</p>
          <p>Вы будете переадресованы в раздел <strong>Мои заказы</strong> </p>
          </div>
        
        </Modal> */}
  </div>);
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
  //console.log("BOOKING FORM")

    
    return (
      <main>
        {this.props.buyOptions === null ? this.unAuthEnter() : this.props.saved ? (this.pending()) : this.standartEnter()}
      </main>
    )
  }
  }

let mapStateToProps = (state) => {
  return {
    buyOptions: state.bookingReducer.get ('buyOptions'),
    saved: state.bookingReducer.get ('saved'),
    userName: state.auth.get ('userName')
    }
}
export default connect(mapStateToProps)(BookingForm)