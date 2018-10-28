import React, { Component } from 'react';
import PropTypes from 'prop-types';

// immutable proptypes
import immutablePropTypes from 'react-immutable-proptypes'


// redux
import { connect } from 'react-redux'

//immutable 
import { fromJS } from 'immutable';

// to see Router and other
import { withRouter } from "react-router-dom";
import { Router} from 'react-router-dom'
import queryString from 'query-string';


// action
import {fetchHotels} from '../../redux/hotelsActions'
import {seacrhFormHandleChangeRedux, priceListActivate} from '../../redux/hotelsActions'


// form parts 
import NightsForm from './SearchFormParts/NightsForm'
import Persons from './SearchFormParts/Persons'
import DatePikers from './SearchFormParts/DatePickers'
import HotelsLists from './SearchFormParts/HotelsLists'
import StarsForm from './SearchFormParts/StarsForm'
import FoodForm from './SearchFormParts/FoodFrom'

// main parts
import PriceList from './PriceList'

// react materialize
import {Input, Button, Row, Col, Preloader} from 'react-materialize'

// events flow
import {mainFormFillEvents} from '../../events/events'



class Search extends Component{
           
    
    componentDidMount(){
    // если пропсы неизменного списка пусты просим список у сервера    
        if (this.props.hotels.length === 0){
            this.props.dispatch (fetchHotels)
        }

    // events listners
        mainFormFillEvents.addListener('handleSearchForm', this.handleChange )
    }

    componentWillUnmount (){
        mainFormFillEvents.removeListener('handleSearchForm', this.handleChange)
    }

    handleChange=(data)=>{
        let {value, name} = data
        this.props.dispatch (seacrhFormHandleChangeRedux (name, value ))   
    }

    searchButtonClick= (e)=>{
        //queryString.stringify({ b: 1, c: 2, a: 3}, {sort: false});
        // let forURL = queryString.stringify ({color: 'red', size: 10, fine: 15} , {sort: false})
        // console.log (forURL)
        // вызывает PriceList к показу
        //https://stackoverflow.com/questions/40161516/how-do-you-programmatically-update-query-params-in-react-router
        // this.props.history.push({
        //     pathname: '/',
        //     search: forURL
        //   })

        // жесточайше проверять валидность строк перед их вставкай и сообщать юзеру если не проходят  
        
        this.props.dispatch (priceListActivate())
        //console.log (this.props)
    }


  
    render() {

       console.log ("RENDER SEARCH")
       console.log (this.props)
       
    return (

        <main>
           
            <Row>
                <Col s={12}>
                    <h5>Даты начала тура</h5>
                    <DatePikers
                   />

                   {this.props.datesError}   
                </Col>        
            </Row>

            <Row>
                <Col s={12}>
                    <h5>Количество ночей </h5>
                    <NightsForm/>
                </Col>
            </Row>

            <Row>
                <Col s={12}>
                <Persons
                children={this.props.children}
                />
                </Col>
                
            </Row>

            <Row>
                <Col s={6}>
                    <StarsForm/>
                </Col>

                <Col s={6}>
                    <FoodForm/>
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
                label="Поиск по названию"
                icon='search'
                >
                
                </Input>
            </Row>
            
            {this.props.hotelPending === true ? (
                <Row className='center'>
                <Col s={12}>
                    <Preloader flashing/>
                </Col>
                </Row>) : (   
                           <Row >
                           {(this.props.hotelPendingErrors === null) ? (
                                
                            <Col s={12}>
                            <h6>Найдено отелей {this.props.mainList.length}</h6>
                            <HotelsLists 
                           
                            hotels={this.props.mainList}
                            selectedHotels={this.props.selectedHotels}
                            />
                            </Col>
            ): (
                <div>Ошибка сети. Проверьте соединение и перезагрузите страницу</div>
                
                 
            )}
            </Row>)}
            
            
            <Row>
                <Col s={12}>
                <Button
                id='searchButton'
                disabled = {this.props.hotelPendingErrors != null || this.props.datesError.length != 0 ? true : false} 
                large 
                className='green right'
                waves='light' 
                icon='search' 
                onClick={this.searchButtonClick}
                />
                </Col>
                
            </Row>    
            
            <Row>
                <Col s={12}>
                    {this.props.priceListStatus=== true ? <PriceList
                    dateFrom={this.props.dateFrom}
                    dateTo={this.props.dateTo}
                    nights={this.props.nights}
                    adults={this.props.adults}
                    children={this.props.children}
                    toShow={(this.props.selectedHotels.length == 0) ? this.props.hotels: this.props.selectedHotels}
                    
                    />: null}
                </Col>

            </Row>
            <button toast="here you go!"
            onClick={()=>{window.Materialize.toast('I am a toast!', 1500)}}>
                Toast
            </button>
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
        hotelPendingErrors: state.hotelsData.hotelPendingErrors,
        datesError: state.hotelsData.datesError,
        
        // props for PriceList
        priceListStatus: state.hotelsData.priceListStatus,
        dateFrom:state.hotelsData.dateFrom,
        dateTo:state.hotelsData.dateTo,
        nights:state.hotelsData.nights,
        adults:state.hotelsData.adults,
        children:state.hotelsData.children,
 
        }
  }




export default connect(mapStateToProps)(Search);