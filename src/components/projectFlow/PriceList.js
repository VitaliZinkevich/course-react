import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import PriceListItem from './PriceListParts/PriceListItem'
import moment from 'moment'
import {Pagination} from 'react-materialize'

import {paginationActivePage} from '../../redux/hotelsActions'
import {saveBookingOpt} from '../../redux/bookingAction'

import { withRouter } from "react-router";
import {queryStringEvent} from '../../events/events'


class PriceList extends PureComponent {

  static propTypes = {

    dateFrom:PropTypes.string,
    dateTo:PropTypes.string,
    nights:ImmutablePropTypes.listOf(PropTypes.number),
    adults:PropTypes.number,
    children:PropTypes.number,
    toShow: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          stars: PropTypes.number.isRequired,
          rooms: ImmutablePropTypes.listOf(
              ImmutablePropTypes.contains ({
                  name:PropTypes.string.isRequired,
                  accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                  price: ImmutablePropTypes.map(
                      ImmutablePropTypes.contains({
                      adult:PropTypes.number,
                      children:PropTypes.number ,
                  }))
              })

          ),
      })
  ),
    
    dispatch: PropTypes.func,
    currentPage:PropTypes.number,
  }

  todosPerPage = 10;
 

  componentWillReceiveProps(newProps){
      if (newProps.currentPage !== this.props.currentPage) {
      queryStringEvent.emit ('makeQueryString')
    }
    }



  buyButton = (buyOptions)=>{
   
    this.props.dispatch (saveBookingOpt (buyOptions))

      this.props.history.push({
        pathname: '/booking',})
   
      
  }

  paginationSelect = (pageNum)=>{

    this.props.dispatch (paginationActivePage(pageNum))
    queryStringEvent.emit ('makeQueryString')

  }

    
  render() {
  console.log ('PRICELIST RENDER')

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

    let personsAcc = `${this.props.adults}+${this.props.children}`

    let hotelListwithSortedRooms = this.props.toShow.map ((hotel, index)=>{
   
      let newRooms
          newRooms = hotel.get('rooms').filter ((room) => {
          if (room.get ('accomodation').indexOf (personsAcc) !== -1) {
            return true
          } else {
            return false
          }
        })
        
        hotel.set('rooms', newRooms)
        
      
   
        return hotel
      })
      
      hotelListwithSortedRooms = hotelListwithSortedRooms.filter (hotel => hotel.get ('rooms').size)
  
    let showList = []

      if (this.props.dateTo!=null) {
        
        dateList.forEach ((date, dateIndex)=>{

           hotelListwithSortedRooms.forEach (( hotel, hotelIndex)=>{
           
            this.props.nights.sort().forEach ((night, nightIndex)=>{
            

               hotel.get ('rooms').forEach((room, roomIndex)=>{
    
                showList.push (
                  
              <div key={dateIndex.toString()+hotelIndex.toString()+nightIndex.toString()+roomIndex.toString()}
              className='buyButtons'>
                 
                        <div className="col s10">
                        <PriceListItem
                            date={date}
                            hotel={hotel}
                            night={night}
                            room={room}
                            adult={this.props.adults}
                            chield={this.props.children}
                          />
                        </div>
                        <div className="col s2">
                        <div className='right'>
                                  <button
                                    onClick={()=>{this.buyButton ({
                                        date:date,
                                        night:night,
                                        hotel:hotel.toJS(), 
                                        room:room.toJS(), 
                                        adults:this.props.adults, 
                                        children:this.props.children, 
                                        })}}
                                      className='waves-effect waves-light btn orange z-depth-3'>Купить
                            </button>
                        </div>
                        
                        </div>
                 
                  
                 

              </div>

                )
    
              })
    
            })

          }) 
        
        })
  
      }
    
    

      // Logic for displaying paginator
    const indexOfLastTodo = this.props.currentPage * this.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.todosPerPage;
    const currentshowList = showList.slice(indexOfFirstTodo, indexOfLastTodo);
    const itemsForPagination = Math.ceil(showList.length/10)

    return (
       <div className='priceList'>
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