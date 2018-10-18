import React, { Component } from 'react';
// redux
import { connect } from 'react-redux'
// materialize and custom css
// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

// action
import {fetchHotels} from '../../redux/actions'
// form parts 
import NightsForm from './SearchFormParts/NightsForm'
import Persons from './SearchFormParts/Persons'
import DatePikers from './SearchFormParts/DatePickers'
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
         
        
        searchForm: {
            dateFrom:null,
            dateTo:null,
            nights:[],
            adults: null,
            children: null
        }
        
    }      
        
    }

    componentDidMount(){
                
        console.log (this.props.hotels)
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
        let hotelList = newProps.hotels.toJS() ;
        this.setState ({pending:newProps.hotelPending, hotels:hotelList })
    }

    handleChange=(data)=>{
               
        let {name, value} = data
        console.log (name)
        console.log (value)

    }


  
    render() {
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

            {this.state.pending == true ? (<Row className='center'><Col s={12}>
                                                <Preloader flashing/>
                                         </Col></Row>) : ""}
            <Button floating large className='red right' waves='light' icon='search' />

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