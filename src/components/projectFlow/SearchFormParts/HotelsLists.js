import React, { Component } from 'react'
import {Input, Navbar, NavItem, Button, Row, Col, Preloader, Icon} from 'react-materialize'
import {mainFormFillEvents} from '../../../events/events'

export class HotelsLists extends Component {

    constructor(props) {
        super(props);
        //let copy = this.props.selectedHotels
        this.state ={
           
            hotels: this.props.hotels.toJS(),
            selectedHotels: this.props.selectedHotels.toJS()
        }
    
    
    
    }
  componentWillUnmount(){
      //console.log ("componentWillUnmount")
  }

  componentWillReceiveProps (newprops){
    //console.log ("componentWillReceiveProps")
    this.setState({selectedHotels:newprops.selectedHotels.toJS()})
    //console.log (newprops)

  }

  handleChange=(e)=>{
    //console.log (this.state.hotels)
    // вот тут перерендарить Hotel List что бы снять выделение с инпута в основном списке если клик по выбранным 
    let element = this.props.hotels.find ((element)=>{ return element.get('_id')==e.target.value})
    //console.log (element)
    mainFormFillEvents.emit ('handleSearchFormChange' ,{name:e.target.name, value: element})
  }

  render() {
     console.log ('RENDER HOTEL LIST')

     //console.log (this.props)
     //console.log ((typeof this.props.selectedHotels))

      let hotelList = this.state.hotels.map ((element)=>{
        return (
            <div key={element._id} className='hotelList'>

                <Input
                onChange={this.handleChange} 
                name='mainList' 
                type='checkbox' 
                value={element._id} 
                label={element.name} 
                className='' />

                <p>{element.type}</p>
                <p> {element.region} </p>
                <p> Звездность {element.stars} </p>
               
            </div>
        )
      })

      let selectedHotels = this.state.selectedHotels.map ((element)=>{
          return (
          <div key={element._id}>
            <Input 
            onChange={this.handleChange} 
            labelClassName='black-text'
            name='selectedList' 
            type='checkbox' 
            value={element._id} 
            label={element.name} 
            checked={true} />
            <p>{element.name}</p>

          </div>
      )

      })


    return (
      <div>
            <Row>

            <Row>
                
                <Input s={12} 
                className='center' 
                label="Search" 
                validate type='tel'>
                <Icon>search</Icon>
                </Input>

            </Row>
            
               <div className='col s12 center '>
               {hotelList}
               </div> 
                
            </Row>
            <Row>
            <div className='col s12'>
               {selectedHotels}
            </div>
            </Row>
      </div>
    )
  }
}

export default HotelsLists
