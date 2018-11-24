import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import {connect} from 'react-redux'
import axios from 'axios'
import {Input, Modal} from 'react-materialize'


 class MyOrders extends PureComponent {

  static propTypes = {
    role: PropTypes.string,
    userName: PropTypes.string,
    orders: PropTypes.oneOfType ([
      ImmutablePropTypes.listOf(),
      ImmutablePropTypes.listOf ( 
        ImmutablePropTypes.contains({
          number: PropTypes.number,
          hotel: PropTypes.string,
          room: PropTypes.string,
          date: PropTypes.string,
          night: PropTypes.number,
          adults: PropTypes.number,
          children: PropTypes.number,
          contactAdress: PropTypes.string,
          contactTel: PropTypes.string,
          touristsData: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
              firstName: PropTypes.string,
              lastName: PropTypes.string,
              passSeries: PropTypes.string,
              passNumber: PropTypes.string,
              passValidTill: PropTypes.string,
            })
          ),
          statusConfirmed: PropTypes.number,
          statusPayment: PropTypes.number,
        }

        )
      )])
    // state.auth.get ('orders')
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
    let newOrdersChanges = []
    newOrdersChanges.push(changeObj)
    this.setState({orderChanges: newOrdersChanges})
    }

    render() {
      console.log("RENDER MY ORDERS")
        let jsOrders
        let viewOrders

        if (this.props.orders !== null ) {

            jsOrders = this.props.orders.toJS()
                      
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
          
        {(jsOrders.length === 0) ? <h5 className='center margin-top-25'>Дорогой {this.props.userName}. У вас нет заказов</h5>: (
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