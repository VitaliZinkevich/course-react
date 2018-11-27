import React, { PureComponent } from 'react'
import {Input, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'


export default class HotelListItem extends PureComponent {

  static propTypes={
    hotel:ImmutablePropTypes.contains({
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
  }),
    name:PropTypes.string
  }


  render() {
    // console.log (`RENDER HOTEL LIST ${this.props.hotel.get ('_id')}`)
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
                
                
                {this.props.name === 'selectedList' ? null: (<p className='starText'> <Icon>star</Icon> {this.props.hotel.get ('stars')}</p>)}
              
            </div>
    )
  }
}
