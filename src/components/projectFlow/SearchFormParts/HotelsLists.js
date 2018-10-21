import React, { Component } from 'react'
import {Input, Navbar, NavItem, Button, Row, Col, Preloader, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'
import HotelListItem from './HotelListItem'

export class HotelsLists extends Component {


  componentWillUnmount(){
      //console.log ("componentWillUnmount")
  }

  componentWillReceiveProps (newprops){
    //console.log ("componentWillReceiveProps")
    //this.setState({selectedHotels:newprops.selectedHotels})
    //console.log (newprops)

  }

  handleChange=(e)=>{
    //console.log (this.state.hotels)
    // вот тут перерендарить Hotel List что бы снять выделение с инпута в основном списке если клик по выбранным 
    //let element = this.props.hotels.find ((element)=>{ return element.get('_id')==e.target.value})
    //console.log (element)
    //mainFormFillEvents.emit ('handleSearchFormChange' ,{name:e.target.name, value: element})
  }

  render() {
     console.log ('RENDER HOTEL LIST')

     //console.log (this.props)
     //console.log ((typeof this.props.selectedHotels))

      let hotelList = this.props.hotels.map ((element)=>{
        return (

            <HotelListItem
                key={element._id}
                hotel={element}
                name='mainList'
            
            />
       
        )
      })

      let selectedHotels = this.props.selectedHotels.map ((element)=>{
          return (


            <HotelListItem
                key={element._id}
                hotel={element}
                name='selectedList'
                
            />

        )

      })


    return (
      <div>
            <Row>
                <Col s={8}>
                    <div className='center'>
                    {hotelList}
                    </div> 
                </Col>
               
            </Row>

            <Row>
                <Col s={4}>
                    <div className='center'>
                    {selectedHotels}
                    </div>
                </Col>
                
            </Row>
      </div>
    )
  }
}

export default HotelsLists
