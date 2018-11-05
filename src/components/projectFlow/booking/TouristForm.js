import React, { PureComponent } from 'react'
import {Input, Row} from 'react-materialize'


export default class TouristhtmlForm extends PureComponent {


  render() {
    let dateOptions = {
      min: new Date(),
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
    //console.log (this.state)
    return (
  
    <div className='touristForm'>
     
      <Row>
      <p className='col s12 black-text flow-text'>Турист номер {this.props.index+1}</p>
        <Input s={6} 
        label="Имя"
        name='firstName'
        labelClassName='black-text'
        icon='account_circle'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}></Input>
        <Input 
        s={6} 
        name='lastName'
        label="Фамилия"
        labelClassName='black-text'
        icon='account_circle'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}
        ></Input>
      </Row>

      <Row>
      <p className='col s12 black-text flow-text'>Паспорт</p>
        <Input s={4} 
        name='passSeries'
        label="Серия" 
        labelClassName='black-text'
        icon='perm_identity'
        
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}>
        
        </Input>

        <Input s={4} 
        name='passNumber'
        label="Номер"
        labelClassName='black-text'
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}/>

        <Input
        s={4} 
        
        label="Действителен до"
        name='passValidTill' 
        type='date' 
        labelClassName='black-text'
        readOnly
        options={dateOptions}
        onChange={(e)=>{this.props.handleChange(e, this.props.index)}}
        ></Input>
   
      </Row>

    </div>
      
    )
  }


}

 