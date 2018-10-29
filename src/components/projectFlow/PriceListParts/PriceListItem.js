import React, { PureComponent } from 'react'

export default class PriceListItem extends PureComponent {
  
  
  
  render() {

    console.log ('PRICE LIST ITEM RENDER')
 
    // показать точно по какую дату в элементе
    return (
      <div className='priceListItem'>
        <div>{this.props.date}</div>
        <div>{this.props.hotel.get('name')}</div>
        <div>{this.props.hotel.get ('type')}</div>

        <div>НОЧЕЙ {this.props.night}</div>
        <div>
          {this.props.room.get ('name')}
        </div>
        <div >
          Цена для {this.props.adult} взрослых и {this.props.chield} детей
         </div>
        <div className='grey'>{(parseInt(this.props.chield)*parseInt((this.props.room.getIn (['price' ,'children'])))+(parseInt(this.props.adult)*parseInt(this.props.room.getIn (['price', 'adult']))))*this.props.night}</div>
      
      </div>
    )
  }
}
