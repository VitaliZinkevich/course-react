import React, { Component } from 'react'
import {CollapsibleItem, Collapsible,Input, Navbar, NavItem, Button, Row, Col, Preloader, Icon} from 'react-materialize'
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

     let collapsibleItemsMinsk = this.props.hotels.filter((el)=>{return(
        el.region =='Минская область')}).map ((el)=>{
            return (
                
                <HotelListItem
                    key={el._id}
                    hotel={el}
                    name='mainList'
                
                />
                 )
     } )

     let collapsibleItemsVitebsk = this.props.hotels.filter((el)=>{return(
        el.region =='Витебская область')}).map ((el)=>{
            return (
               
                   <HotelListItem
                       key={el._id}
                       hotel={el}
                       name='mainList'
                    />
           )
       
    } )
      

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

                <h5>Hotels List</h5>
               
                    <Collapsible 
                    popout={false}
                    >
                        <CollapsibleItem 
                        header='Минская область' 
                        icon='location_on'>
                            {collapsibleItemsMinsk}
                        </CollapsibleItem>
                    </Collapsible>

                    <Collapsible
                    >
                        <CollapsibleItem  
                            header='Витебская область' 
                            icon='location_on'>
                            {collapsibleItemsVitebsk}
                        </CollapsibleItem>
                    </Collapsible>
                   
                </Col>

                <Col s={4}>
                        <div className='left'>
                        <h5>Selected Hotels</h5>
                        {selectedHotels}
                        </div>
                </Col>

            </Row>
      </div>
    )
  }
}

export default HotelsLists
