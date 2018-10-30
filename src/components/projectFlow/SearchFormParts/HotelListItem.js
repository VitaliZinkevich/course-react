import React, { Component, PureComponent } from 'react'
import {Input, Icon, Row} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

export default class HotelListItem extends PureComponent {
  render() {
    //this.props= this.props.toJS()
    //console.log (this.props)
    console.log (`RENDER HOTEL LIST ${this.props.hotel.get ('_id')}`)
    return (
         <div  className='hotelList'>
           
                <Input
                onChange={()=>{
                    mainFormFillEvents.emit('handleSearchForm', {value: this.props.hotel, name: this.props.name})
                }}
                checked ={this.props.name === 'selectedList' ? true : false} 
                name={this.props.name} 
                type='checkbox' 
                value={this.props.hotel.get ('_id')} 
                label={this.props.hotel.get ('name')} 
                labelClassName='black-text' />

                {this.props.name === 'selectedList' ? null: (<p>{this.props.hotel.get ('type')}</p>)}
                {this.props.name === 'selectedList' ? (<p> {this.props.hotel.get ('region')} </p>): null}
                
                
                {this.props.name === 'selectedList' ? null: (<p> <Icon>star</Icon> {this.props.hotel.get ('stars')}</p>)}
              
            </div>
    )
  }
}
