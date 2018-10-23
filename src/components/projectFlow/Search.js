import React, { Component } from 'react';
// redux
import { connect } from 'react-redux'

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
        
    }


  
    render() {

       console.log ("RENDER SEARCH")
       
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
                <Persons/>
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
        datesError: state.hotelsData.datesError
        }
  }




export default connect(mapStateToProps)(Search);