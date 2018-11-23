import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Input, Modal} from 'react-materialize'


 class MyOrders extends PureComponent {

  
  orderChanges=[]
  
  state= {
    openModal: false
  }
  

  saveOrder = ()=>{
  
    
  let toServer = this.orderChanges
  axios.post('http://localhost:8080/ordersChange', {changes: toServer},{withCredentials: true})
  .then ((res)=>{
    this.setState({openModal:true})
    setTimeout(()=>{this.setState({openModal:false})}, 2000)
  })
  // на сервер отправить все изменения
  }

  handleInputs= (num, val)=>{
    // console.log( num, val.target.name, val.target.value )

    let changeObj = {
      orderNumber: num,
      orderStatus: val.target.name,
      statusValue: val.target.value
    }

    this.orderChanges.push (changeObj)
    console.log(this.orderChanges)
    
    }

    render() {
        let jsOrders
        let viewOrders

        if (this.props.orders !== null ) {

            jsOrders = this.props.orders.toJS()
            console.log(jsOrders)
            
              viewOrders = jsOrders.map ((el, index)=>{

                let touristList = el.touristsData.map ((elem, index)=>{
                 return (
                   <span key={index}>
                   {elem.firstName} <br/>
                   {elem.lastName} <br/>
                   {elem.passNumber} <br/>
                   </span>
   
                 )
   
                })
   
                 return (

               <tr key={el.number}>
                   <td>{el.number}</td>
                   <td>
                   <Input 
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
                   </td> 
                   <td stule={{width:'300px'}}>
                   <Input 
                   name='statusPayment' 
                   onChange={(e)=>{this.handleInputs(el.number, e)}} 
                   type='select' defaultValue={el.statusPayment} 
                   disabled={this.props.role === 'user'}
                   className='black-text'>
                   
                     <option  value='1'>Неоплачено</option>
                     <option  value='2'>Оплачено</option>
                     <option  value='3'>Частично оплачено</option>
                   </Input>
                   </td>
                   <td>{el.hotel}</td>
                   <td>{el.room}</td>
                   <td>{el.date}</td>
                   <td>{el.night}</td>
                   <td>{el.contactTel}</td>
                   <td>{touristList}</td>
                  
               </tr>
   
                 )
               })

             
            
        }

        

        
        
    return (
      <main>
          
        {(jsOrders.length === 0) ? <div className='center margin-top-25'>Дорогой {this.props.userName}. У вас нет заказов</div>: (
          <div>
          <h5 className='center'>Заказы пользователя {this.props.userName}</h5>

          <table className='centered responsive-table'>
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

          </table>
          {this.props.role === 'admin'? (<div className='center'>
          <button 
          className='waves-effect waves-light btn blue margin-arround btn-large' 
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