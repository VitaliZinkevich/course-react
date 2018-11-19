import React, { PureComponent } from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {setAuth} from '../../redux/authAction'
import axios from 'axios'

 class SingUp extends PureComponent {

    state = {
        email: null,
        password: null,
        password2: null,
        errors: ['Введите все данные'],
        message:''
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

        if (state.password !== state.password2  ) {
            newErrors.push ('Пароли не совпадают')
        }
        this.setState({errors:newErrors})
    }



    submit= async()=>{
        
        axios.post('http://localhost:8080/signup', {
            email: this.state.email,
            password: this.state.password
          }).then ((res)=>{
              this.setState ({message: res.data})
              this.props.dispatch (setAuth (this.state.email))
          })
      
    }

  render() {
    return (
    <main className='row'>
            <div className='offset-s3 col s6 center'>
                <input placeholder='email' type='email' name='email' onChange={(e)=>{this.handleChange(e)}}/>
                <input placeholder='password' type='password' name ='password'  onChange={(e)=>{this.handleChange(e)}}/>
                <input placeholder='repeat password' type='password' name ='password2'  onChange={(e)=>{this.handleChange(e)}}/>
                <button  onClick={this.submit} disabled={this.state.errors.length !== 0}>
                Зарегистрироваться        </button>
                
                <div>
                    {this.state.message !== ''  ? (<div className='center'>{this.state.message } <br/>
                    <Link to={`/`}> К прайс листу</Link></div> ) : 
                    null}
                </div>


            </div>
    </main>
    )
  }
}

let mapStateToProps = (state) => {
    return {
       
    }
}

export default connect (mapStateToProps) (SingUp)

