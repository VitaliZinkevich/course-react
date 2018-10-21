import React, { PureComponent } from 'react'
import {Input, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'
export default class HotelListItem extends PureComponent {
  render() {
    console.log (`RENDER HOTEL LIST ${this.props.hotel._id}`)
    return (
         <div  className='hotelList'>

                <Input
                onChange={()=>{
                    mainFormFillEvents.emit('handleSearchForm', {value: this.props.hotel, name: this.props.name})
                }}
                checked ={this.props.name === 'selectedList' ? (true): (false)} 
                name={this.props.name} 
                type='checkbox' 
                value={this.props.hotel._id} 
                label={this.props.hotel.name} 
                className='' />

                {this.props.name === 'selectedList' ? null: (<p>{this.props.hotel.type}</p>)}
                
                <p> {this.props.hotel.region} </p>
                {this.props.name === 'selectedList' ? null: (<p> Звездность {this.props.hotel.stars}</p>)}
               
            </div>
    )
  }
}
