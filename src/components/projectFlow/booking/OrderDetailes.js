import React, { PureComponent } from 'react'
import moment from 'moment'

export default class OrderDetailes extends PureComponent {
  render() {

    let start = moment(this.props.date, "DD-MM-YYYY")
    start.add (this.props.night+1, 'd')


    return (
      <div className='bookingsStatus'>
          <div className='center'>
          Отель
           <p className='center'>{this.props.hotel}</p>
          </div>
          <div className='center'>
          Номер
          <p className='center'>{this.props.room}</p> 
          </div>
          <div className='center'>
          Заселение  
           <p className='center'>{this.props.date}</p>
          </div>
          <div className='center'>
          Ночей  
           <p className='center'>{this.props.night}</p>
          </div>
          <div className='center'>
          Дней  
           <p className='center'>{this.props.night+1}</p>
          </div>
          <div className='center'>
          Выселение   <p className='center'>{`${(start.date().length === 1 ? '0'+start.date():start.date() )}.${start.month()+1}.${start.year()}`}</p>
          </div>
          <div className='center'>
          Размещение   <p className='center'>{this.props.ad.toString()+'+'+this.props.ch.toString()}</p>
          </div>
          
        
      </div>
    )
  }
}
