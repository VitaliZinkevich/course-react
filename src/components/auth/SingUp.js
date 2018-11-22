import React, { PureComponent } from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {getAuth} from '../../redux/authAction'
import axios from 'axios'
import {Preloader} from 'react-materialize'

 class SingUp extends PureComponent {

    state = {
        email: null,
        password: null,
        password2: null,
        errors: ['Введите электронную почту','Введите пароль','Пароли не совпадают' ],
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
            newErrors[0]='Введите почту'
        }

        if (state.password === null ||state.password === '' ) {
            newErrors[1]='Введите пароль'
           
        }

        if (state.password !== state.password2  ) {
            newErrors[2]='Пароли не совпадают'
            
        }
        this.setState({errors:newErrors})
    }



    submit= async()=>{
        
        axios.post('http://localhost:8080/signup', {
            email: this.state.email,
            password: this.state.password
          },{withCredentials: true},).then ((res)=>{
              this.setState ({message: res.data})
              this.props.dispatch (getAuth (this.state.email, this.state.password))
          })
      
    }

  render() {
      console.log(this.props)
    return (
    <main className='row'>


            <div className='offset-s3 col s6 center  margin-top-50'>
             {this.props.authPending === true ? (<Preloader size='big'/>) : (<>
                <input placeholder='Электронная почта' type='email' name='email' onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[0]}</span>
                <input placeholder='Пароль' type='password' name ='password'  onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[1]}</span>
                <input placeholder='Повторите пароль' type='password' name ='password2'  onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[2]}</span><br/>
                
                <button  
                onClick={this.submit} 
                disabled={this.state.errors.length !== 0}
                className='waves-effect waves-light btn blue margin-top-25'>
                Зарегистрироваться        
                </button>
                
                <div>
                    {this.state.message !== ''  ? (<div className='center'>{this.state.message } <br/>
                    <Link to={`/`}> К прайс листу</Link></div> ) : 
                    null}
                </div>
             </>)}    
               


            </div>
    </main>
    )
  }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.get('isAuth'),
        authPending: state.auth.get('authPending'),
    }
}

export default connect (mapStateToProps) (SingUp)

