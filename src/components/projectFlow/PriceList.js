import React, { PureComponent } from 'react'
import PriceListItem from './PriceListParts/PriceListItem'
import moment from 'moment'
import {Pagination} from 'react-materialize'
import {paginationActivePage} from '../../redux/hotelsActions'
import { withRouter } from "react-router";
import {fromJS} from 'immutable'
import {queryStringEvent} from '../../events/events'



class PriceList extends PureComponent {

  todosPerPage = 10;
 

  componentWillReceiveProps(newProps){
    // console.log(typeof newProps.currentPage)
    // console.log(typeof this.props.currentPage)

    if (newProps.currentPage !== this.props.currentPage) {
      queryStringEvent.emit ('makeQueryString')
    }
    
  }



  buyButton = (buyOptions)=>{
    // роутер тут
    
    // авторизация после этого клика


    //объект настроек покупки для создания компонента бронирования
    const BUY_OPTIONS = fromJS (buyOptions);
    

    // начало процесса покупки с переходом на другой компонент и auth
    console.log (BUY_OPTIONS)
    this.props.history.push('/booking')
    
  }

  paginationSelect = (pageNum)=>{
    // диспатчнуть состояние активной кнопки
    
    this.props.dispatch (paginationActivePage(pageNum))
    
    queryStringEvent.emit ('makeQueryString')

  }

    
  render() {
    


    console.log ('PRICELIST RENDER')
    //console.log (this.props)
    

    

    // создаем массив дат который будет отображать список как параметр
    let dateList = []
    let start = moment(this.props.dateFrom, "DD-MM-YYYY")
    let end = moment(this.props.dateTo, "DD-MM-YYYY")
       
    if (end.diff(start , 'days') === 0 ) {
      dateList.push (this.props.dateFrom)
    } else {

      let difDays = end.diff(start , 'days')
      dateList.push (this.props.dateFrom)
      
      for ( let i = 0 ; i < difDays; i++ ) {
        start.add (1, 'd')
        dateList.push(`${start.date()}.${start.month()+1}.${start.year()}`)
      }
    }

    // создаем размещение для проверки

    let personsAcc = `${this.props.adults}+${this.props.children}`
    //console.log (personsAcc)

    // оставляем только те номера только те номера которые подходят по размещению
   
    let hotelListwithSortedRooms = this.props.toShow.map ((hotel, index)=>{
      //console.log (hotel.rooms)
        let newRooms
          newRooms = hotel.get('rooms').filter ((room) => {
          if (room.get ('accomodation').indexOf (personsAcc) != -1) {
            return true
          } else {
            return false
          }
        })
        
        hotel.set('rooms', newRooms)
        
      
        // усли нет номеров в объекте его нужно удалить потом  
        return hotel
      })
      
      hotelListwithSortedRooms = hotelListwithSortedRooms.filter (hotel => hotel.get ('rooms').size)
  

    // далее готовим большой массив для показа
    let showList = []

      if (this.props.dateTo!=null) {
        
        dateList.forEach ((date, dateIndex)=>{

           hotelListwithSortedRooms.forEach (( hotel, hotelIndex)=>{
           
            this.props.nights.sort().forEach ((night, nightIndex)=>{
            

               hotel.get ('rooms').forEach((room, roomIndex)=>{
    
                showList.push (
                  
              <div key={dateIndex.toString()+hotelIndex.toString()+nightIndex.toString()+roomIndex.toString()}
              className='buyButtons'>
                  
                  <PriceListItem
                    date={date}
                    hotel={hotel}
                    night={night}
                    room={room}
                    adult={this.props.adults}
                    chield={this.props.children}
                  />
                  <button 
                    onClick={()=>{this.buyButton ({
                      date:date,
                      night:night ,
                      hotel:hotel, 
                      room:room, 
                      adults:this.props.adults, 
                      children:this.props.children, 
                      currentPage:this.props.currentPage})}}
                    className='waves-effect waves-light btn blue'>Купить
                  </button>

              </div>

                )
    
              })
    
            })

          }) 
        
        })
  
      }
    console.log(showList)
    

      // Logic for displaying paginator
    const indexOfLastTodo = this.props.currentPage * this.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.todosPerPage;
    const currentshowList = showList.slice(indexOfFirstTodo, indexOfLastTodo);
    const itemsForPagination = Math.ceil(showList.length/10)

    return (
       <div>
    {currentshowList}
    {currentshowList.length !== 0 && showList.length>10 ? (
      <Pagination 
      className='center' 
      items={itemsForPagination} 
      activePage={parseInt (this.props.currentPage)} 
      maxButtons={8} 
      onSelect={(e)=>{this.paginationSelect(e)}}
      />
     
    ): null}
    
    
      </div>
    )
  }
}
export default  withRouter (PriceList)