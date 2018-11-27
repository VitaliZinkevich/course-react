import React, { Component } from 'react'
import moment from 'moment'
import {Icon} from 'react-materialize' 

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';


export default class PriceListItem extends Component {
  
  static propTypes = {
  date:PropTypes.string,
  hotel:PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    stars: PropTypes.number,
    rooms: PropTypes.arrayOf(
      PropTypes.shape ({
            name:PropTypes.string,
            accomodation: PropTypes.arrayOf(PropTypes.string),
            price: PropTypes.shape(
                PropTypes.shape({
                adult:PropTypes.number,
                children:PropTypes.number ,
            }))
        })

    ),
}),
  night: PropTypes.number.isRequired,
  room: PropTypes.shape ({
          name:PropTypes.string,
          accomodation: PropTypes.arrayOf(PropTypes.string),
          price: PropTypes.shape(
              PropTypes.shape({
              adult:PropTypes.number,
              children:PropTypes.number ,
          }))
      })

  ,
  adult:PropTypes.number.isRequired,
  chield:PropTypes.number.isRequired,}
  
  
  render() {
    let endDate = moment(this.props.date, "DD-MM-YYYY").add(this.props.night+1, 'd')
    let ckeckOutDate = `${(endDate.date().toString().length === 1) ? '0'+endDate.date() : endDate.date()}.${endDate.month()+1}.${endDate.year()}`
    // console.log ('PRICE LIST ITEM RENDER')
 
    
    return (
      <div className='priceListItem'>
        <div>C {this.props.date}</div>
        <div>НОЧЕЙ {this.props.night}</div>
        <div>По {ckeckOutDate}</div>
        <div>
        <Link 
        to={`/detailes/${this.props.hotel.get('_id')}`}
          >
        {this.props.hotel.get('name')}</Link></div>
        <div>{this.props.hotel.get ('type')}</div>

        
        <div className='roomName'>
          {this.props.room.get ('name')}
        </div>
        <div className='guestsText'>
        <Icon>person</Icon> {this.props.adult} <Icon>child_care</Icon> {this.props.chield} 
         </div>
        <div><strong> {(parseInt(this.props.chield)*parseInt((this.props.room.getIn (['price' ,'children'])))+
        (parseInt(this.props.adult)*parseInt(this.props.room.getIn (['price', 'adult']))))*this.props.night} 
        </ strong> RUR </div>
      
      </div>
    )
  }
}
