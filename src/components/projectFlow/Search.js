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
import {seacrhFormHandleChangeRedux} from '../../redux/searchFormActions'
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
        mainFormFillEvents.removeListener('handleSearchFormChange', this.handleChange)
    }

    componentWillReceiveProps(newProps){
        //console.log ('RECIVE NEW PROPS', newProps) 
        this.setState ({pending:newProps.hotelPending, hotels:newProps.hotels })
               
    }

    handleChange=(data)=>{
        let {value, name} = data
        console.log (value, name)

        
        this.props.dispatch (seacrhFormHandleChangeRedux ())       
        
        
        

        // switch(name) {
        //     case 'mainList':{
        //         let newSelectedList = this.state.selectedHotels
    
                        
        //                 if  (this.state.selectedHotels.indexOf(value) === -1) {
        //                     newSelectedList = newSelectedList.push (value)
        //                     this.setState ({selectedHotels: newSelectedList})
        //                 } else {
        //                     newSelectedList= newSelectedList.deleteIn([this.state.selectedHotels.indexOf(value)])
        //                     this.setState ({selectedHotels: newSelectedList})
        //                 }    
                                   
        //     break;

        //     }
                
               
        //     case 'selectedList':{
        //             let newSelectedList = this.state.selectedHotels

        //             console.log (this.state.selectedHotels.indexOf(value))
        //             newSelectedList= newSelectedList.deleteIn([this.state.selectedHotels.indexOf(value)]) // почему это работает??
                   
        //             this.setState ({selectedHotels: newSelectedList})
        //         break;
        //     }
                           
        //     default:
        //     break;
        // }

        //  console.log (name)
        // console.log (value)

    }


  
    render() {

       console.log ("RENDER SEARCH")
       //console.log (this.props)
    return (

        <main>
           
            <Row>
                <DatePikers/>   
            </Row>

            <Row>
                <NightsForm/>
            </Row>

            <Row>
                <Persons/>
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
                className='center' 
                label="Search"
                >
                <Icon>search</Icon>
                </Input>
            </Row>
            
            {this.props.hotelPending === true ? (
            <Row className='center'><Col s={12}>
                <Preloader flashing/>
            </Col></Row>) : (
            <Row >
                <HotelsLists 
                
                hotels={this.props.mainList}
                selectedHotels={this.props.selectedHotels}
                />
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
        hotelPending: state.hotelsData.hotelPending,
        foodTypes: state.hotelsData.foodTypes,
        starsTypes: state.hotelsData.starsTypes,
        
        selectedHotels:state.searchForm.selectedHotels 

        }
  }




export default connect(mapStateToProps)(Search);