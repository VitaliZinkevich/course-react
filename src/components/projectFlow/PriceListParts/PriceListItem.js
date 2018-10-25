import React, { Component } from 'react'

export default class PriceListItem extends Component {
  render() {
    // console.log (this.props.adult)
    // console.log (this.props.chield)

    // console.log (this.props.room.price.adult)
    // console.log (this.props.room.price.children)

    // console.log ((parseInt(this.props.adult)*parseInt(this.props.room.price.adult)))
    // console.log ((parseInt(this.props.chield)*parseInt(this.props.room.price.children)))
    // console.log ()




    return (
      <div>
        <div>НОЧЕЙ {this.props.night}</div>
        <div>
          {this.props.room.name}
        </div>
        <div className='blue'>
          Цена для {this.props.adult}взрослых и {this.props.chield} детей
          <div>{(parseInt(this.props.chield)*parseInt(this.props.room.price.children))+(parseInt(this.props.adult)*parseInt(this.props.room.price.adult))}</div>
        </div>
      </div>
    )
  }
}
