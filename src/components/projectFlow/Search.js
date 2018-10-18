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
// react materialize
import {Input, Navbar, NavItem, Button, Row, Col, Preloader} from 'react-materialize'

//jquery
import $ from 'jquery'



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
            dateTo:null,}
        
    }      
        
    }

    componentDidMount(){
        console.log ('MOUNT PROPS', this.props)
        console.log ('MOUNT STATE', this.state)

        

        if (this.props.hotels.toJS().length === 0){
            console.log ('ask for hotels')
            this.props.getHotels()
        } else {
            console.log (this.props.hotels.toJS().length)
        }
        
    }

    componentWillReceiveProps(newProps){
        console.log ('RECIVE PROPS', newProps)        
        let hotelList = newProps.hotels.toJS() ;
        this.setState ({pending:newProps.hotelPending, hotels:hotelList })
    }

    handleChange=(e, value)=>{
        console.log (e.target.name)
        console.log (value)

    }
  
    render() {
       //console.log (this.props)
    return (

        <main>
           
            <Row>
                
                    <Input 
                    s={6} 
                    label='Start from'
                    labelClassName='black-text' 
                    name='dateFrom' 
                    type='date' 
                    onChange={(e, value)=>{this.handleChange(e, value)}} 
                    />
                

                
                    <Input
                    s={6} 
                    label='Start to'
                    labelClassName='black-text'  
                    name='dateFrom1' 
                    type='date' 
                    onChange={(e, value)=>{this.handleChange(e, value)}} 
                    />
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