import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import {ordersPropTypesArray} from './propTypes'
import {connect} from 'react-redux'
import {reNewOrders} from '../../redux/authAction'
import {updateOrder} from '../../redux/bookingAction'

import {Input, Modal, Collapsible, CollapsibleItem, Preloader, Row, Col} from 'react-materialize'
// import { s3Upload } from "../../libs/awsLib";
// import amplifyConfig from '../../amplify.config'
// import {Preloader} from 'react-materialize'


import moment from 'moment'

moment.locale('ru')
 class MyOrders extends PureComponent {

  static propTypes = {
    role: PropTypes.string,
    userName: PropTypes.string,
    orders: ordersPropTypesArray
    
  }

  //file = null;
  
  state= {
    // openModalpeymentPart: false,
    openModal: false,
    orderChanges:[],
    paymentPartInput:{orderNumber: '', value: ''}
  }
  

  componentDidMount() {
    this.props.dispatch (reNewOrders());
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps (newProps){

  }

  saveOrder = ()=>{
   this.props.dispatch(updateOrder(this.state.orderChanges))
  .then ((res)=>{
    this.setState({openModal:true,orderChanges: []})
    setTimeout(()=>{this.setState({openModal:false})}, 2000)
    this.props.dispatch (reNewOrders())
  })

  }

  handleInputs= (order, event)=>{
 
    // let changeObj
      
    //   changeObj = {
    //     orderNumber: num,
    //     orderStatus: val.target.name,
    //     statusValue: val.target.value
    //   }

    let {name, value} = event.target;
    

    let index = this.findWithAttr(this.state.orderChanges, 'number', order.number);

    if ( index === -1){
      order[name] = Number (value);
      let newOrdersChanges = [...this.state.orderChanges];
      newOrdersChanges.push(order);
      this.setState({orderChanges: newOrdersChanges});
    } else {
      let newOrdersChanges = [...this.state.orderChanges];
      newOrdersChanges[index][name] = Number (value);
      this.setState({orderChanges: newOrdersChanges});
    }
  }

  // handlePaymentPartInput =(number, value)=>{
  //   // paymentPartInput:{orderNumber: '', value: 0}
  //   // console.log(number, value)
  //   let newPaymentPartInput= {}
    
  //   newPaymentPartInput.orderNumber = number
  //   newPaymentPartInput.value =value

  //   this.setState ({paymentPartInput : newPaymentPartInput})
        
  // }

  findWithAttr = (array, attr, value) => {
      //console.log(array, attr, value)
      for(var i = 0; i < array.length; i += 1) {
        //console.log((array[i][attr] === value))
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
  }


  // addOrderChange=(num)=>{
  //   let changeObj = {
  //     orderNumber: num,
  //     orderStatus: "paymentPart",
  //     statusValue: this.state.paymentPartInput.value

  //   }
  //   let newOrdersChanges = [...this.state.orderChanges]
  //   newOrdersChanges.push(changeObj)
  //   let newPaymentPartInput = {...this.state.PaymentPartInput}
  //   newPaymentPartInput.value = ''
  //   newPaymentPartInput.orderNumber = ''
  //   this.setState({orderChanges: newOrdersChanges,openModalpeymentPart: true, paymentPartInput: newPaymentPartInput}, ()=>{
  //     setTimeout(()=>{this.setState({openModalpeymentPart:false})}, 2000)
      
  //   })
  // }

  // handleFileChange=(event)=>{
  //   this.file = event.target.files[0];
  // }

  // handleUploadFile = async (event)=>{
  //   event.preventDefault();
	  
	// 	if (this.file && this.file.size > amplifyConfig.MAX_ATTACHMENT_SIZE) {
	// 	  alert(`Please pick a file smaller than ${amplifyConfig.MAX_ATTACHMENT_SIZE/1000000} MB.`);
	// 	  return;
	// 	}
	  
  // 	try {
	// 	  await s3Upload(this.file).then (res=>console.log(res))
	// 	  // this.props.history.push("/");
	// 	} catch (e) {
	// 	  alert(e);
  //   }
  // }


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

    orders = ()=>{
      // console.log("RENDER MY ORDERS")
      // console.log(this.props)
      // console.log(this.state.orderChanges)
      let jsOrders
      let viewOrders



      if (this.props.orders !== null ) {

          jsOrders = this.props.orders.toJS()
                    
            viewOrders = jsOrders.map ((el, index)=>{

              let touristList = el.touristsData.map ((elem, index)=>{
               return (
                <div key={index} className='ml5'>
                 
                 <div className='tourist-data-ind'>
                 <p>{index+1}</p>
                   <p className='ml5'><strong>Имя </strong>  {elem.firstName}</p>
                   <p className='ml5'><strong>Фамилия </strong> {elem.lastName}</p>
                   <p className='ml5'><strong>Серия паспорта </strong>{elem.passSeries}</p>
                   <p className='ml5'><strong>Номер паспорта </strong>{elem.passNumber}</p>
                 </div>
                 
                </div>
                
 
               )
 
              })

             let orderNumber = el.number.toString()
             
             //console.log(el.statusPayment )
          return (

            
            
            <CollapsibleItem 
            key={el.number} 
            header={`Заказ номер ${orderNumber} |
            ${el.statusConfirmed === 1 ? 'Бронирование':( el.statusConfirmed === 2)? 'Подтверждено' : 'Аннулировано'} 
            |
            ${el.statusPayment === 1 ? 'Не оплачено': el.statusPayment === 2? 'Оплачено' : "Частично оплачено"} 
            |
            Цена ${(el.price) ? ` ${el.price} | Оплачено ${(el.paymentPart === undefined ? null: el.paymentPart)} Долг ${el.price-el.paymentPart}`: ""} 
            `} 
            className='z-depth-4 margin-ordres-list'>
              
              <div className='row'>
              <div className='col s6'>
              <div><strong>Статус заявки</strong> </div>

              <div> <strong> Дата создания {moment (Date.parse (el.dateOfCreation)).locale('ru').format("DD.MM.YYYY, H:mm:ss")}</strong></div>
              {this.props.role === 'admin' ? <div> <strong>Заявка пользователя: {el.orderCreatorEmail}</strong></div> : null}
              </div>
              <div className='col s6'>
              <strong> Статус оплаты</strong>
              <div>Цена {el.price}</div>
              <div>Оплачено {el.paymentPart}</div>
              <div>Долг {el.price-el.paymentPart}</div>
              
              {/* {el.statusPayment === 3 ? (

              <><input
              value={this.state.paymentPartInput.value}
              name='paymentPart'
              placeholder='Полученная сумма'
              // handlePaymentPartInput =(number, value)
              onChange={(e)=>(this.handlePaymentPartInput(el.number, e.target.value))}

              />
              


              <button
               onClick={()=>{this.addOrderChange(el.number)}}
              className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-arround textstrong btn-small'
              disabled={ this.state.paymentPartInput.value === ''}
              >Сохранить</button>
              </>): null} */}

              </div>
              </div>
              
              <div className='row d-fr-status'>
                 
                <Input 
                 s={6}
                 name='statusConfirmed' 
                 onChange={(e)=>{this.handleInputs(el, e)}} 
                 type='select' 
                 defaultValue={el.statusConfirmed} 
                 disabled={this.props.role === 'user'}
                 >
                   <option  value='1'>Бронирование</option>
                   <option  value='2'>Подтверждено</option>
                   <option  value='3'>Аннулировано</option>
                 </Input>
                
                 <Input 
                 s={6}
                 name='statusPayment' 
                 onChange={(e)=>{this.handleInputs(el, e)}} 
                 type='select' defaultValue={el.statusPayment} 
                 disabled={this.props.role === 'user'}
                 className='black-text'>
                   <option  value='1'>Не оплачено</option>
                   <option  value='2'>Оплачено</option>
                   <option  value='3'>Частично оплачено</option>
                 </Input>

                
                 
              </div>
              <strong > Проживание</strong>
              <div className='d-fr-living'>
                 <div><p><strong>Отель </strong></p> {el.hotel}</div>
                 <div><p><strong>Номер </strong></p>{el.room}</div>
                 <div><p><strong>Дата начала проживания </strong></p>{el.date}</div>
                 <div><p><strong>Количество ночей </strong></p>{el.night}</div>
              </div>
              
              <p ><strong> Контакты</strong></p>
              <div className='contacts'>
              <div ><p><strong>Контактыный телефон </strong> {el.contactTel}</p></div>
              <div className='ml5'><p><strong>Адрес  </strong> {el.contactAdress}</p></div>
              </div>
              <p ><strong> Туристы по заявке</strong></p>
              <div className='touristdata'>
              
              
              {touristList}

                
              </div>

              {/* <div>
                {this.props.role === 'admin' ? (
                <>
                <input 
                  onChange={this.handleFileChange}
                  type='file'
                  name="uploadVauch"
                  accept="image/png, image/jpeg" />
                <button
                  onClick={this.handleUploadFile}
                  className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-arround textstrong btn-small'
                  >Загрузить ваучер</button>
                  </>
                  ) : (
                <button
                  className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-arround textstrong btn-small'
                >Скачать ваучер</button>
                )}
              </div> */}


              {this.props.role === 'admin'? (<div className=''>
                  <button 
                  disabled={( this.state.orderChanges.length === 0 ||
                     this.state.openModal === true ||
                     (this.findWithAttr (this.state.orderChanges, "number" , el.number) === -1)
                     )}
                
                  className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-arround textstrong btn-large' 
                  onClick={this.saveOrder}
                  
                  >Сохранить</button>
                  </div>
                ):
                  null}
            </CollapsibleItem>
            )
             })
 
      }
      
  return (
    <main>
        {(this.props.authPending || this.props.orderPending) ? this.pending(): ((jsOrders.length === 0) ? <h5 className='center margin-top-25'>Дорогой {this.props.userName}. У вас нет заказов</h5>: (
        <div>
        <h5 className='center'>Пользователь {this.props.userName}, роль {this.props.role}</h5>
        
        <Collapsible accordion>
        {viewOrders} 
        </Collapsible>

        {/* <table className='centered responsive-table'>
          <thead>
            <tr>
                
                <th>Номер заявки</th>
                <th>Статус подтверждения</th> 
                <th>Оплата</th>
                <th>Отель</th>
                <th>Номер</th>
                <th>Дата</th>
                <th>Ночей</th>
                <th>Контактный тел</th>
                <th>Туристы</th>

            </tr>
          </thead>  
         
          <tbody>
          {viewOrders}
          </tbody>

        </table> */}

      
        </div>
      ))}
      
          <Modal
              open={this.state.openModal}
              actions={null}
              >
              <div className='center'>
              <h2>Изменения успешно сохранены</h2>
              </div>
             
          </Modal>
          {/* <Modal
              open={this.state.openModalpeymentPart}
              actions={null}
              >
              <div className='center'>
              <h2>Частичная оплата записана</h2>
              <p>Обновите данные на сервере</p>
              </div>
             
          </Modal> */}

          {/* openModalpeymentPart */}
    </main>
  )

    }

    render() {
      return (
        this.orders()
      )
    }
}

let mapStateToProps = (state) => {
    return {

    role: state.auth.get ('role'),
    userName: state.auth.get ('userName'),
    orders: state.auth.get ('orders'),
    authPending: state.auth.get('authPending'),
    orderPending: state.bookingReducer.get('orderPending'),
    }
}

export default connect(mapStateToProps)(MyOrders)