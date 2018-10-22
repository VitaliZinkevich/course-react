import React, { Component } from 'react';
// redux
import { connect } from 'react-redux'
// materialize and custom css
// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

//immutable 
import { fromJS } from 'immutable';

// action
import {fetchHotels} from '../../redux/hotelsActions'
import {seacrhFormHandleChangeRedux} from '../../redux/hotelsActions'
// form parts 
import NightsForm from './SearchFormParts/NightsForm'
import Persons from './SearchFormParts/Persons'
import DatePikers from './SearchFormParts/DatePickers'
import HotelsLists from './SearchFormParts/HotelsLists'
import StarsForm from './SearchFormParts/StarsForm'
import FoodForm from './SearchFormParts/FoodFrom'
// react materialize
import {Input, Navbar, NavItem, Button, Row, Col, Preloader, Icon} from 'react-materialize'

//jquery
import $ from 'jquery'
// events flow
import {mainFormFillEvents} from '../../events/events'


class Search extends Component{
           
    
    componentDidMount(){
    // Берем список отелей с сервера      
        if (this.props.hotels.length === 0){
            //console.log ('ask for hotels')
            this.props.dispatch (fetchHotels)
        } else {
           
        }
    // events listners
        mainFormFillEvents.addListener('handleSearchForm', this.handleChange )
    }

    componentWillUnmount (){
        mainFormFillEvents.removeListener('handleSearchForm', this.handleChange)
    }

    componentWillReceiveProps(newProps){
       
        this.setState ({pending:newProps.hotelPending, hotels:newProps.hotels })
               
    }

    handleChange=(data)=>{
        let {value, name} = data
        console.log (value, name)
    }


  
    render() {

       console.log ("RENDER SEARCH")
       
    return (

        <main>
           
            <Row>
                <Col s={12}>
                    <h5>Start dates </h5>
                    <DatePikers/>   
                </Col>        
            </Row>

            <Row>
                <Col s={12}>
                    <h5>Number of nights </h5>
                    <NightsForm/>
                </Col>
            </Row>

            <Row>
                <Col s={12}>
                <Persons/>
                </Col>
                
            </Row>

            <Row>
                <Col s={6}>
                    <StarsForm 
                    stars={this.props.starsTypes}/>
                </Col>

                <Col s={6}>
                    <FoodForm
                    food={this.props.foodTypes}/>
                </Col>
            </Row>
            
            <Row>
                <Input s={12}
                name='search'
                onChange={(e)=>{
                    this.handleChange({
                        name: e.target.name,
                        value: e.target.value,
                        })

                }}
                className='center' 
                label="Search"
                icon='search'
                >
                
                </Input>
            </Row>
            
            {this.props.hotelPending === true ? (
            <Row className='center'><Col s={12}>
                <Preloader flashing/>
            </Col></Row>) : (
            <Row >
                <Col s={12}>
                <HotelsLists 
                search={this.props.search}
                hotels={this.props.mainList}
                selectedHotels={this.props.selectedHotels}
                />
                </Col>
            </Row>)}
            
            

            <Button 
            floating 
            large 
            className='red right' 
            waves='light' 
            icon='search' />

        </main> 
      
    );
  }
}

let mapStateToProps = (state) => {
    
    return {
        hotels: state.hotelsData.hotels,
        mainList: state.hotelsData.mainList,
        selectedHotels:state.hotelsData.selectedHotels,
        hotelPending: state.hotelsData.hotelPending,
        foodTypes: state.hotelsData.foodTypes,
        starsTypes: state.hotelsData.starsTypes,
        search: state.hotelsData.search,
        }
  }




export default connect(mapStateToProps)(Search);