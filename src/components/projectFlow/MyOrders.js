import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import {ordersPropTypesArray} from './propTypes'
import {connect} from 'react-redux'
import axios from 'axios'
import {Input, Modal, Collapsible, CollapsibleItem} from 'react-materialize'


 class MyOrders extends PureComponent {

  static propTypes = {
    role: PropTypes.string,
    userName: PropTypes.string,
    orders: ordersPropTypesArray
    
  }

  
  state= {
    openModal: false,
    orderChanges:[]
  }
  

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  saveOrder = ()=>{
  
    
  let toServer = this.state.orderChanges
  axios.post('http://localhost:8080/ordersChange', {changes: toServer},{withCredentials: true})
  .then ((res)=>{
    this.setState({openModal:true,orderChanges: []})
    setTimeout(()=>{this.setState({openModal:false})}, 2000)
    
  })

  }

  handleInputs= (num, val)=>{

    let changeObj = {
      orderNumber: num,
      orderStatus: val.target.name,
      statusValue: val.target.value
    }
    let newOrdersChanges = [...this.state.orderChanges]
    newOrdersChanges.push(changeObj)
    this.setState({orderChanges: newOrdersChanges})
    }

    render() {
      console.log("RENDER MY ORDERS")
      console.log(this.props)
      //console.log(this.state.orderChanges)
        let jsOrders
        let viewOrders

        if (this.props.orders !== null ) {

            jsOrders = this.props.orders.toJS()
                      
              viewOrders = jsOrders.map ((el, index)=>{

                let touristList = el.touristsData.map ((elem, index)=>{
                 return (
                  <div key={index} className='ml5'>
                   
                   <div>
                     <p><strong>Имя </strong>  {elem.firstName}</p>
                     <p><strong>Фамилия </strong> {elem.lastName}</p>
                     <p><strong>Серия паспорта </strong>{elem.passSeries}</p>
                     <p><strong>Номер паспорта </strong>{elem.passNumber}</p>
                   </div>
                   
                  </div>
                  
   
                 )
   
                })

                return (


              <CollapsibleItem 
              key={el.number} 
              header={`Заказ номер ${el.number.toString()} |
              ${el.statusConfirmed === 1 ? 'Бронирование':( el.statusConfirmed === 2)? 'Подтверждено' : 'Аннулировано'} |
              ${el.statusPayment === 1 ? 'Не оплачено': el.statusPayment === 2? 'Оплачено' : "Частично оплачено"}`} 
              className='z-depth-4 margin-ordres-list'>
                
                <div className='row'>
                <div className='col s6'>
                <strong>Статус заявки</strong> 
                </div>
                <div className='col s6'>
                <strong> Статус оплаты</strong>
                </div>
                </div>
                
                <div className='row d-fr-status'>
                   
                  <Input 
                   s={6}
                   name='statusConfirmed' 
                   onChange={(e)=>{this.handleInputs(el.number, e)}} 
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
                   onChange={(e)=>{this.handleInputs(el.number, e)}} 
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
                <p className='margin-top-25'><strong> Контакты</strong></p>
                <div className='contacts'>
                <div ><p><strong>Контактыный телефон </strong> {el.contactTel}</p></div>
                <div className='ml5'><p><strong>Адрес  </strong> {el.contactAdress}</p></div>
                </div>

                
                <Collapsible className='blue lighten-3'>

                <CollapsibleItem header='Туристы по заявке'>
                
                <div className='touristdata'>
                {touristList}
                </div>
                
                </CollapsibleItem>
                </Collapsible>


                  
              </CollapsibleItem>

              //  <tr key={el.number}>
              //      <td>{el.number}</td>
              //      <td style={{minWidth:'100px'}}>
              //      <Input 
              //      name='statusConfirmed' 
              //      onChange={(e)=>{this.handleInputs(el.number, e)}} 
              //      type='select' 
              //      defaultValue={el.statusConfirmed} 
              //      disabled={this.props.role === 'user'}
              //      >
              //        <option  value='1'>Бронирование</option>
              //        <option  value='2'>Подтверждено</option>
              //        <option  value='3'>Аннулировано</option>
              //      </Input>
              //      </td> 
              //      <td style={{minWidth:'125px'}}>
              //      <Input 
              //      name='statusPayment' 
              //      onChange={(e)=>{this.handleInputs(el.number, e)}} 
              //      type='select' defaultValue={el.statusPayment} 
              //      disabled={this.props.role === 'user'}
              //      className='black-text'>
              //        <option  value='1'>Не оплачено</option>
              //        <option  value='2'>Оплачено</option>
              //        <option  value='3'>Частично оплачено</option>
              //      </Input>
              //      </td>
              //      <td>{el.hotel}</td>
              //      <td>{el.room}</td>
              //      <td>{el.date}</td>
              //      <td>{el.night}</td>
              //      <td>{el.contactTel}</td>
              //      <td>{touristList}</td>
                  
              //  </tr>
   
                 )
               })

             
            
        }

        

        
        
    return (
      <main>
          
        {(jsOrders.length === 0) ? <h5 className='center margin-top-25'>Дорогой {this.props.userName}. У вас нет заказов</h5>: (
          <div>
          <h5 className='center'>Заказы пользователя {this.props.userName}</h5>
          
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

          {this.props.role === 'admin'? (<div className='center'>
          <button 
          disabled={( this.state.orderChanges.length === 0 || this.state.openModal === true)}
         
          className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-arround textstrong btn-large' 
          onClick={this.saveOrder}
          
          >Сохранить</button>
          </div>
         ):
           null}
          </div>
        )}
            <Modal
                open={this.state.openModal}
                actions={null}
                >
                <div className='center'>
                <h2>Все заявки изменены</h2>
                </div>
               
            </Modal>
      </main>
    )
  }
}

let mapStateToProps = (state) => {
    return {

    role: state.auth.get ('role'),
    userName: state.auth.get ('userName'),
    orders: state.auth.get ('orders')
    
    }
}

export default connect(mapStateToProps)(MyOrders)