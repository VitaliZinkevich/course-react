import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'


export default class NoPage extends PureComponent {
  render() {
    return (
      <main className='center'>
        <h1>Такой страницы нет</h1>
        <br/>
        <div className='center'>
        <Link to='/'><h2>На главную страницу</h2></Link>
        </div>
        
      </main>
    )
  }
}
