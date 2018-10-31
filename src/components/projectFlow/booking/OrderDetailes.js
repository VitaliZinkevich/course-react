import React, { PureComponent } from 'react'
import moment from 'moment'

export default class OrderDetailes extends PureComponent {
  render() {

    let start = moment(this.props.date, "DD-MM-YYYY")
    start.add (this.props.night+1, 'd')


    return (
      <div className='bookingsStatus'>
          <div>
          Отель
           <p>{this.props.hotel.name}</p>
          </div>
          <div>
          Номер
          <p>{this.props.room.name}</p> 
          </div>
          <div>
          Заселение  
           <p>{this.props.date}</p>
          </div>
          <div>
          Ночей  
           <p>{this.props.night}</p>
          </div>
          <div>
          Дней  
           <p>{this.props.night+1}</p>
          </div>
          <div>
          Выселение   <p>{`${(start.date().length == 1 ? '0'+start.date():start.date() )}.${start.month()+1}.${start.year()}`}</p>
          </div>
          <div>
          Размещение   <p>{this.props.ad.toString()+'+'+this.props.ch.toString()}</p>
          </div>
          
        
      </div>
    )
  }
}
