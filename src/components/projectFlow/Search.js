import React, { Component } from 'react';
// redux
import { connect } from 'react-redux'
// materialize and custom css
// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

//immutable 
import { fromJS } from 'immutable';

// action
import {fetchHotels} from '../../redux/actions'
// form parts 
import NightsForm from './SearchFormParts/NightsForm'
import Persons from './SearchFormParts/Persons'
import DatePikers from './SearchFormParts/DatePickers'
import HotelsLists from './SearchFormParts/HotelsLists'
// react materialize
import {Input, Navbar, NavItem, Button, Row, Col, Preloader} from 'react-materialize'

//jquery
import $ from 'jquery'
// events flow
import {mainFormFillEvents} from '../../events/events'


class Search extends Component{
    

    constructor(props) {
       super(props);
        
    this.state={
        pending:this.props.hotelPending,
        hotels:this.props.hotels,
        foodTypes:this.props.foodTypes.toJS(),
        starsTypes:this.props.starsTypes.toJS(),

            dateFrom:null,
            dateTo:null,
            nights:[],
            adults: null,
            children: null,
            selectedHotels:fromJS([]),
        
        
    }      
        
    }

    componentDidMount(){
                
        //console.log (this.props.hotels)
       
        if (this.props.hotels.toJS().length === 0){
            console.log ('ask for hotels')
            this.props.getHotels()
        } else {
           
        }
    // events listners
    mainFormFillEvents.addListener('handleSearchFormChange', this.handleChange )
    }

    componentWillUnmount (){
        mainFormFillEvents.removeListener('handleSearchFormChange', this.handleChange)
    }

    componentWillReceiveProps(newProps){
        //console.log ('RECIVE PROPS', newProps) 
        // обновляется только в том случае если отелей нет в стейте        console.log ((this.state.hotels.lenght === 0 ))
        console.log ("RECEIVE PROPS")    
        console.log (newProps.hotels.toJS().length)

            this.setState ({pending:newProps.hotelPending, hotels:newProps.hotels })
             
        
    }

    handleChange=(data)=>{
               
        let {name, value} = data

        switch(name) {
            case 'mainList':{
                let newSelectedList = this.state.selectedHotels
    
                

                    
                        
                        if  (this.state.selectedHotels.indexOf(value) === -1) {
                            newSelectedList = newSelectedList.push (value)
                            this.setState ({selectedHotels: newSelectedList})
                        } else {
                            newSelectedList= newSelectedList.deleteIn([this.state.selectedHotels.indexOf(value)])
                            this.setState ({selectedHotels: newSelectedList})
                        }    
                                   
            break;

            }
                
               
            case 'selectedList':{
                    let newSelectedList = this.state.selectedHotels

                    console.log (this.state.selectedHotels.indexOf(value))
                    newSelectedList= newSelectedList.deleteIn([this.state.selectedHotels.indexOf(value)]) // почему это работает??
                   
                    this.setState ({selectedHotels: newSelectedList})
                break;
            }
                           
            default:
            break;
        }

         console.log (name)
        console.log (value)

    }


  
    render() {

       console.log ("RENDER SEARCH")
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

            
            {this.state.pending === true ? (
            <Row className='center'><Col s={12}>
                <Preloader flashing/>
            </Col></Row>) : (

            <Row >
                <HotelsLists 
                hotels={this.state.hotels}
                selectedHotels={this.state.selectedHotels}
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
        hotels: state.get ('hotels'),
        hotelPending: state.get("hotelPending"),
        foodTypes: state.get ('foodTypes'),
        starsTypes: state.get ('starsTypes'),
        }
  }

  let mapDispatchToProps = (dispath)=>{
    return {
        getHotels: ()=>{dispath (fetchHotels)}
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(Search);