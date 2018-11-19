
import React, { PureComponent } from 'react'
import axios from 'axios'


import {Redirect} from 'react-router-dom'
import BookingForm from '../projectFlow/BookingForm'

import { connect } from 'react-redux'
import {getAuth} from '../../redux/authAction'
import {Link} from "react-router-dom"


class SingIn extends PureComponent {

    
    state = {
        email: null,
        password: null,
        errors: ['Введите почту', 'Введите пароль'],
        
    }

    componentWillReceiveProps(newProps){
        // console.log('new props')
        if (newProps.isAuth === true) {
            // console.log(this.props.location)
            if (this.props.location.state !== undefined) {
                this.props.history.push (this.props.location.state.from)
            } else {

                this.props.history.push ('/')
            }

            
        }
    }

    handleChange=(e, index=null)=>{
        
        this.setState ({[e.target.name]: e.target.value}, ()=>{this.validate (this.state)})
        
    }
    
    validate (state) {
        let newErrors = []
        if (state.email === null || state.email === '') {
            newErrors.push ('Введите почту')
        }

        if (state.password === null ||state.password === '' ) {
            newErrors.push ('Введите пароль')
        }
        this.setState({errors:newErrors})
    }



    submit= async()=>{
        
        this.props.dispatch (getAuth(this.state.email, this.state.password))
        
        
        //console.log(this.props)

        
      
    }

  render() {
  //console.log(this.props)
  // добавить лодер
    return (
        <main className='row'>
        <div className='offset-s3 col s6 center' > 
            <input placeholder='email' type='email' name='email' onChange={(e)=>{this.handleChange(e)}}/>
            <input placeholder='password' type='password' name ='password'  onChange={(e)=>{this.handleChange(e)}}/>
            <button  onClick={this.submit} disabled={this.state.errors.length !== 0}>
                LogIn        </button>
            
            <div>
                {this.props.message === 'nouser' ? (<div className='center'>Нет такого пользователя <br/><Link to={`/singup`}> Зарегистрироваться</Link></div> ) : 
                null }
                {/* <div className='center'>{this.props.message }</div> */}

            </div>
        </div>  
        </main>
    )
  }
}

let mapStateToProps = (state) => {
        return {
            authPending: state.auth.get('authPending'),
            isAuth: state.auth.get('isAuth'),
            rejectedError: state.auth.get('rejectedError'),
            message: state.auth.get('message'),
        }
  }

export default  connect (mapStateToProps)(SingIn)