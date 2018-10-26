import React, { Component } from 'react'

export default class PriceListItem extends Component {
  
  
  
  render() {

    console.log ('PRICE LIST ITEM RENDER')
    // console.log (this.props.adult)
    // console.log (this.props.chield)

    // console.log (this.props.room.price.adult)
    // console.log (this.props.room.price.children)

    // console.log ((parseInt(this.props.adult)*parseInt(this.props.room.price.adult)))
    // console.log ((parseInt(this.props.chield)*parseInt(this.props.room.price.children)))
    // console.log ()



    // показать точно по какую дату в элементе
    return (
      <div>
        <div>{this.props.date}</div>
        <div>{this.props.hotel.name}</div>
        <div>{this.props.hotel.type}</div>

        <div>НОЧЕЙ {this.props.night}</div>
        <div>
          {this.props.room.name}
        </div>
        <div className='grey'>
          Цена для {this.props.adult}взрослых и {this.props.chield} детей
          <div>{(parseInt(this.props.chield)*parseInt((this.props.room.price.children))+(parseInt(this.props.adult)*parseInt(this.props.room.price.adult)))*this.props.night}</div>
        </div>
        
      </div>
    )
  }
}
