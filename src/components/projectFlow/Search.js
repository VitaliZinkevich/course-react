import React, { Component } from 'react';
import PropTypes from 'prop-types';
// immutable proptypes
import ImmutablePropTypes from 'react-immutable-proptypes'
// redux
import { connect } from 'react-redux'
// to see Router and other
import queryString from 'query-string';
// action
import {fetchHotels, clearForm, seacrhFormHandleChangeRedux, priceListActivate, linkWithQuerToProps} from '../../redux/hotelsActions'
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
import {mainFormFillEvents, queryStringEvent} from '../../events/events'



class Search extends Component{
    
    static propTypes= {
        hotels:PropTypes.oneOfType ([
            ImmutablePropTypes.listOf(),
            ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    stars: PropTypes.number.isRequired,
                    rooms: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains ({
                            name:PropTypes.string.isRequired,
                            accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                            price: ImmutablePropTypes.map(
                                ImmutablePropTypes.contains({
                                adult:PropTypes.number,
                                children:PropTypes.number ,
                            }))
                        })
    
                    ),
                })
            ),
        ]),
        mainList:PropTypes.oneOfType([
            ImmutablePropTypes.listOf(),
            ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    stars: PropTypes.number.isRequired,
                    rooms: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains ({
                            name:PropTypes.string.isRequired,
                            accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                            price: ImmutablePropTypes.map(
                                ImmutablePropTypes.contains({
                                adult:PropTypes.number,
                                children:PropTypes.number ,
                            }))
                        })
    
                    ),
                })
            )
            
          ]),
        selectedHotels:PropTypes.oneOfType([
            ImmutablePropTypes.listOf(),
            ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    stars: PropTypes.number.isRequired,
                    rooms: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains ({
                            name:PropTypes.string.isRequired,
                            accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                            price: ImmutablePropTypes.map(
                                ImmutablePropTypes.contains({
                                adult:PropTypes.number,
                                children:PropTypes.number ,
                            }))
                        })
    
                    ),
                })
            )
            
          ]),
        hotelPending: PropTypes.bool.isRequired,
        hotelPendingErrors: PropTypes.string,
        formMessages:ImmutablePropTypes.listOf (PropTypes.string),
        // for Price List Component
        priceListStatus: PropTypes.bool,
        dateFrom:PropTypes.string,
        dateTo:PropTypes.string,
        nights:ImmutablePropTypes.listOf(PropTypes.number),
        foodType:PropTypes.string,
        starsType: PropTypes.string,
        adults:PropTypes.number,
        children:PropTypes.number,
        isGetQueryString: PropTypes.bool

    }

   componentDidMount(){
    window.scrollTo(0, 0)
    // если пропсы неизменного списка пусты просим список у сервера    
        if (this.props.hotels.size === 0){
            this.props.dispatch (fetchHotels)

        }

    // events listners
        mainFormFillEvents.addListener('handleSearchForm', this.handleChange )
        queryStringEvent.addListener('makeQueryString', this.createQueryLink )
    }

    componentWillReceiveProps (newProps) {
    
        if (newProps.formMessages.size !== 0) {

            for (let e of newProps.formMessages) {
                
                window.Materialize.toast(e, 3000)
            }
            
        }
       
        
        if ( newProps.hotels.size !== 0 && this.props.isGetQueryString !== true) {
            
            if (this.props.location.search !== '') {
           
                let query = this.props.location.search
                const parsedHash = queryString.parse(query);
                this.props.dispatch (linkWithQuerToProps(parsedHash))
                }
           
        }
    }

    componentWillUnmount (){
        console.log('SEARCH UNMOUNT')
        mainFormFillEvents.removeListener('handleSearchForm', this.handleChange)
        queryStringEvent.removeListener('makeQueryString', this.createQueryLink )
    }

    handleChange=(data)=>{

        let {value, name} = data
        this.props.dispatch (seacrhFormHandleChangeRedux (name, value ))   
    }

    searchButtonClick= ()=>{
       
        this.createQueryLink()
        this.props.dispatch (priceListActivate())
        
    }

    clearButtonClick= ()=>{
        console.log("CLEAR BUTTON")
        window.scrollTo(0, 0)
        this.props.dispatch (clearForm())
        this.props.history.push({
            pathname: '/',
            search: ''
          })
         
        //dispathc action with clear all form
    }
    
    createQueryLink = ()=>{
        let selectedHotelsValue = this.props.selectedHotels.toJS()
        selectedHotelsValue = selectedHotelsValue.map (el=>el._id)

        let mainListHotelsValue = this.props.mainList.toJS()
        mainListHotelsValue = mainListHotelsValue.map (el=>el._id)

        let forURL = queryString.stringify({ 
            dateFrom: this.props.dateFrom, 
            dateTo: this.props.dateTo, 
            nights:this.props.nights.toJS().toString(),
            adults:this.props.adults,
            children:this.props.children,
            starsType: this.props.starsType,
            foodType: this.props.foodType,
            currentPage:this.props.currentPage,
            selectedHotels:selectedHotelsValue.toString(),
            mainList: mainListHotelsValue.toString(),

            
        })
              
        this.props.history.push({
            pathname: '/',
            search: forURL
          })
    }

  
    render() {

       console.log ("RENDER SEARCH")
       

       

       
    return (

        <main className='searchFormClass'>
           
            <Row>
                <Col s={12}>
                    <h5>Даты начала тура</h5>
                    <DatePikers
                    valueFrom={this.props.dateFrom}
                    valueTo={this.props.dateTo}
                   />

                </Col>        
            </Row>

            <Row>
                <Col s={12}>
                    <h5>Количество ночей </h5>
                    <NightsForm
                    valueNights = {this.props.nights}
                    />
                </Col>
            </Row>

            <Row>
                <Col s={12}>
                <Persons
                childrenValue={this.props.children}
                adultValue={this.props.adults}

                />
                </Col>
                
            </Row>

            <Row>
                <Col s={6}>
                    <StarsForm
                    stars= {this.props.starsType}
                    />
                </Col>

                <Col s={6}>
                    <FoodForm
                    foodValue={this.props.foodType}
                    />
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
                    <Preloader 
                    color='green'
                    flashing/>
                </Col>
                </Row>) : (   
                           <Row >
                           {(this.props.hotelPendingErrors === '') ? (
                                
                            <Col s={12}>
                            <h5 className='green-text'>Отелей в списке {this.props.mainList.size}</h5>
                            <HotelsLists 
                            hotels={this.props.mainList}
                            selectedHotels={this.props.selectedHotels}
                            />
                            </Col>
            ): (
                <div className='center red-text'>Ошибка сервера. Попробуйте позже </div>
                
                 
            )}
            </Row>)}
            
            
            <Row>
                
                <Col s={12}>
                <Button
                title="Поиск по заданным параметрам"
                id='searchButton'
                disabled = {this.props.hotelPendingErrors !== '' 
                || this.props.formMessages.size !== 0 
                || this.props.dateFrom === null 
                || this.props.dateTo === null ? true : false} 
                large 
                className='orange darken-3 right z-depth-4'
                waves='light' 
                icon='search' 
                onClick={this.searchButtonClick}
                />

                <Button
                title="Очистить форму поиска"
                id='clearButton'
                large 
                className='orange lighten-3 right z-depth-4 textstrong'
                waves='light' 
                icon='clear' 
                onClick={this.clearButtonClick}
                />
                </Col>
                
            </Row>    
            
            <Row>
                <Col s={12}>
                    {this.props.priceListStatus=== true ? 
                    <PriceList
                    dateFrom={this.props.dateFrom}
                    dateTo={this.props.dateTo}
                    nights={this.props.nights}
                    adults={this.props.adults}
                    children={this.props.children}
                    toShow={(this.props.selectedHotels.size === 0) ? this.props.mainList: this.props.selectedHotels}
                    dispatch={this.props.dispatch}
                    currentPage={this.props.currentPage}
                    
                    />: null}
                </Col>

            </Row>

        </main> 
      
    );
  }
}

let mapStateToProps = (state) => {
    
    return {
        hotels: state.hotelsData.get ('hotels'),
        mainList: state.hotelsData.get ('mainList'),
        selectedHotels:state.hotelsData.get ('selectedHotels'),
        hotelPending: state.hotelsData.get ('hotelPending'),
        hotelPendingErrors: state.hotelsData.get ('hotelPendingErrors'),
        formMessages: state.hotelsData.get ('formMessages'),
        foodType:state.hotelsData.get ('foodType'),
        starsType: state.hotelsData.get ('starsType'),
        // props for PriceList
        priceListStatus: state.hotelsData.get ('priceListStatus'),
        dateFrom:state.hotelsData.get ('dateFrom'),
        dateTo:state.hotelsData.get ('dateTo'),
        nights:state.hotelsData.get ('nights'),
        adults:state.hotelsData.get ('adults'),
        children:state.hotelsData.get ('children'),
        currentPage:state.hotelsData.get ('currentPage'),
        // queryString
        isGetQueryString:state.hotelsData.get ('isGetQueryString'),

 
        }
  }




export default connect(mapStateToProps)(Search);