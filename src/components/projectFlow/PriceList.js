import React, { Component } from 'react'
import PriceListItem from './PriceListParts/PriceListItem'
import moment from 'moment'
import {Pagination} from 'react-materialize'


export default class PriceList extends Component {


  state = {
    currentPage: 1,
    todosPerPage: 10
  };


  buyButton = (date,night ,hotel, room, adults, children)=>{

    // начало процесса покупки с переходом на другой компонент и автотификации
    console.log (date, night ,hotel, room, adults, children)
  }

  paginationSelect = (pageNum)=>{
    this.setState ({currentPage:pageNum})
  }

    
  render() {
    


    console.log ('PRICELIST RENDER')

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
    console.log (personsAcc)

    // оставляем только те номера только те номера которые подходят по размещению
    // МУТАБЕЛЬНО !!!!
    let hotelListwithSortedRooms = this.props.toShow.map ((hotel, index)=>{
      //console.log (hotel.rooms)
          hotel.rooms = hotel.rooms.filter ((room) => {
          if (room.accomodation.indexOf (personsAcc) != -1) {
            return true
          } else {
            return false
          }
        })

        
        //console.log (hotel.rooms.length)
        // усли нет номеров в объекте его нужно удалить потом  
        return hotel
      })
      
      hotelListwithSortedRooms = hotelListwithSortedRooms.filter (hotel => hotel.rooms.length)
      // console.log (hotelListwithSortedRooms)
      // console.log (this.props.toShow)

    // далее готовим большой массив для показа
    let showList = []

      if (this.props.dateTo!=null) {
        
        dateList.forEach ((date, dateIndex)=>{

           hotelListwithSortedRooms.forEach (( hotel, hotelIndex)=>{
           
            this.props.nights.forEach ((night, nightIndex)=>{
            

               hotel.rooms.forEach((room, roomIndex)=>{
    
                showList.push (
                  // прилично придумать как сделать ключ для каждого элемента
              <div key={dateIndex.toString()+hotelIndex.toString()+nightIndex.toString()+roomIndex.toString()}>
                  
                  <PriceListItem
                    date={date}
                    hotel={hotel}
                    night={night}
                    room={room}
                    adult={this.props.adults}
                    chield={this.props.children}
                  />
                  <button 
                    onClick={()=>{this.buyButton (date,night ,hotel, room, this.props.adults, this.props.children)}}
                    className='waves-effect waves-light btn blue'>Купить
                  </button>

              </div>

                )
    
              })
    
            })

          }) 
        
        })
    
        //showList = showList.map (el => (<div>{el}</div>))
    
      }
    
    

      // Logic for displaying paginator
    const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
    const currentshowList = showList.slice(indexOfFirstTodo, indexOfLastTodo);

    const itemsForPagination = Math.ceil(showList.length/10)

   
let test = <div>{2+2}</div>
  // console.log (showList)
  // console.log (test)

  // console.log (this.props)

    return (
       <div>
    {currentshowList}

    <Pagination 
    className='center' 
    items={itemsForPagination} 
    activePage={this.state.currentPage} 
    maxButtons={8} 
    onSelect={this.paginationSelect}
    />
    
      </div>
    )
  }
}
