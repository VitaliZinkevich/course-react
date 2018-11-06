import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'


export default class NoPage extends PureComponent {
  render() {
    return (
      <div className='center'>
        <h1>Такой страницы нет</h1>
        <br/>
        <div className='blue'>
        <Link className='white-text' to='/'>На главную страницу</Link>
        </div>
        
      </div>
    )
  }
}
