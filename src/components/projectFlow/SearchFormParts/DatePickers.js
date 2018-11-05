import React, { Component } from 'react';
import {Input} from 'react-materialize'


//event flow
import {mainFormFillEvents} from '../../../events/events'

class DatePickers extends  Component{
    
    handleChangeDates=(e, value)=>{
        mainFormFillEvents.emit('handleSearchForm', {name: e.target.name, value})
    }

    

render (){

    console.log('RENDER DATEPICKERS')
 

    // максимальная дата доступная в календаре
    let result = new Date()
    result.setDate(result.getDate()+183)
    
    let dateOptions = {
        min: new Date(),
        max: result,
        monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdaysShort: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        monthsShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октября', 'Ноября', 'Декабря'],
        weekdaysFull: ['Воск', 'Пон', 'Вт', 'Ср', 'Чтв', 'Птн', 'Суб'],
        firstDay: 1,
        showMonthsShort: true,
        showWeekdaysFull: true,
        format: 'dd.mm.yyyy',
        today: '',
        clear: 'Очистить',
        close: '',
        closeOnSelect: true,
    }

    
   return (
    <div>
        <Input 
        s={6} 
        value={this.props.valueFrom || ''}
        placeholder='Заселение с'
        name='dateFrom' 
        type='date' 
        onChange={(e, value)=>{this.handleChangeDates(e, value)}}
        options={dateOptions}
        
        />

        <Input
        s={6} 
        placeholder='Заселение по'
        name='dateTo' 
        type='date' 
        onChange={(e, value)=>{this.handleChangeDates(e, value)}} 
        options={dateOptions}
        value={this.props.valueTo || ''}
        />
    </div>
    )
    }
}

export default DatePickers
