import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {getAuth} from '../../redux/authAction'
import {Link} from "react-router-dom"
import {Preloader} from 'react-materialize'

import PropTypes from 'prop-types';
// immutable proptypes
import ImmutablePropTypes from 'react-immutable-proptypes'

class SingIn extends PureComponent {

    static propTypes ={
            authPending: PropTypes.bool,
            isAuth: PropTypes.bool,
            rejectedError: PropTypes.instanceOf(ImmutablePropTypes.list)
    }

    state = {
        email: '',
        password: '',
        errors: ['Введите почту', 'Введите пароль'],
        message:''
    }

    componentWillReceiveProps(newProps){
        
        if (newProps.isAuth === true) {
            
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
            newErrors[0]= 'Введите почту'
        }

        if (state.password === null ||state.password === '' ) {
            newErrors[1]= 'Введите пароль'
        }
        this.setState({errors:newErrors})
    }



    submit= async()=>{
        
        this.props.dispatch (getAuth(this.state.email, this.state.password)).then ((res)=>{
            if (res.value.data.message !=='Есть пользователь') {
                this.setState({message: res.value.data.message})
            }
            
       
        })
           
    }

  render() {
      //console.log(typeof (null))

   let  fromVar = null
   if (this.props.location.state === undefined) {
    fromVar = '/'
   } else {
    fromVar = this.props.location.state.from
   }

    return (
        <main className='row'>
        <div className='offset-s3 col s6 center margin-top-50' > 
            {this.props.authPending === true ? (<Preloader 
            color='green'
            size='big'/>) : (<>
                
                <input 
                placeholder='Электронная почта' 
                type='email' 
                name='email' 
                value={this.state.email} 
                onChange={(e)=>{this.handleChange(e)}}/>

                <span className='red-text'>{this.state.errors[0]}</span>
                <input 
                placeholder='Пароль' 
                type='password' 
                name ='password'
                value={this.state.password}  
                onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[1]}</span><br/>
                
                <button  
                onClick={this.submit} 
                disabled={this.state.errors.length !== 0}
                className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-top-25 btn-large textstrong'  >
                Войти
                </button>
                {this.state.message === '' ? 
                (<div className='margin-top-25'>
                <Link className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-top-25 textstrong white-text' to={{pathname:"/singup" , state: {from: fromVar }}}>Или регистрация</Link>
                </div>) : 
                (null)}
                <div>
                {this.state.message !== '' ? (<div className='center margin-top-25'>{this.state.message} <br/><Link to={`/singup`}> <strong>Регистрация</strong></Link></div> ) : 
                null }
                </div>
                </>
            )}

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
            
        }
  }

export default  connect (mapStateToProps)(SingIn)