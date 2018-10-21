import React, { Component } from 'react';
import {Input, Navbar, NavItem, Button, Row, Col, Preloader} from 'react-materialize'

//event flow
import {mainFormFillEvents} from '../../../events/events'

class DatePickers extends  Component{

    handleChangeDates=(e, value)=>{
        mainFormFillEvents.emit('handleSearchForm', {name: e.target.name, value})
    }

    

render (){

    let dateOptions = {
        min: new Date(),
        monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdaysShort: ['ВСК', 'ПНД', 'С', 'Ч', 'Пт', 'С', 'Вск'],
        monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июль', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        weekdaysFull: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        firstDay: 1,
        showMonthsShort: true,
        showWeekdaysFull: true,
        format: 'dd.mm.yyyy',
        today: 'Сегодня',
        clear: 'Clear',
        close: 'Close',
    }

    return (<div>
    <Input 
                        s={6} 
                        label='Start from'
                        labelClassName='black-text' 
                        name='dateFrom' 
                        type='date' 
                        onChange={(e, value)=>{this.handleChangeDates(e, value)}}
                        options={dateOptions}
                        />
                    
                        <Input
                        s={6} 
                        label='Start to'
                        labelClassName='black-text'  
                        name='dateFrom1' 
                        type='date' 
                        onChange={(e, value)=>{this.handleChangeDates(e, value)}} 
                        />
    </div>)}
}

export default DatePickers
