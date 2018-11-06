import React, { Component } from 'react'
import moment from 'moment'
import {Icon} from 'react-materialize' 

import { Link } from "react-router-dom";



export default class PriceListItem extends Component {
  
  
  
  render() {
    let endDate = moment(this.props.date, "DD-MM-YYYY").add(this.props.night+1, 'd')
    let ckeckOutDate = `${(endDate.date().toString().length === 1) ? '0'+endDate.date() : endDate.date()}.${endDate.month()+1}.${endDate.year()}`
    console.log ('PRICE LIST ITEM RENDER')
 
    
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

        
        <div>
          {this.props.room.get ('name')}
        </div>
        <div >
        <Icon>person</Icon> {this.props.adult} <Icon>child_care</Icon> {this.props.chield} 
         </div>
        <div className='grey'>{(parseInt(this.props.chield)*parseInt((this.props.room.getIn (['price' ,'children'])))+(parseInt(this.props.adult)*parseInt(this.props.room.getIn (['price', 'adult']))))*this.props.night}</div>
      
      </div>
    )
  }
}
