
import React, { PureComponent } from 'react'
import axios from 'axios'


import {Redirect} from 'react-router-dom'
import BookingForm from '../projectFlow/BookingForm'


export default class SingIn extends PureComponent {


    // class Login extends React.Component {
    //     state = { redirectToReferrer: false };
      
    //     login = () => {
    //       fakeAuth.authenticate(() => {
    //         this.setState({ redirectToReferrer: true });
    //       });
    //     };
      
    //     render() {
    //       let { from } = this.props.location.state || { from: { pathname: "/" } };
    //       let { redirectToReferrer } = this.state;
      
    //       if (redirectToReferrer) return <Redirect to={from} />;
      
    //       return (
    //         <div>
    //           <p>You must log in to view the page at {from.pathname}</p>
    //           <button onClick={this.login}>Log in</button>
    //         </div>
    //       );
    //     }
    //   }




    state = {
        email: null,
        password: null,
        errors: [],
        auth: false,
    }

      handleChange=(e, index=null)=>{
  
        this.setState ({[e.target.name]: e.target.value})
      
    }

    submit= async()=>{
        console.log('submit form')
        
        this.auth = await axios.get('http://localhost:8080/auth').then ((res)=>{
            this.setState ({auth: true})
            if (this.state.auth){
                this.props.history.push ('/booking')
            } else {
                alert ('NO AUTH')
            }
        })
       
      



        // login = () => {
        //     fakeAuth.authenticate(() => {
        //       this.setState({ redirectToReferrer: true });
        //     });
        //   };


    // console.log(this.props) есть модем
    // axios.get('http://localhost:8080/auth')
    
    // if (this.state.auth == true) {
    //     console.log('rendr booking form')
    //     return <Redirect to={BookingForm} />;
    //  }   


    }


    // let { from } = this.props.location.state || { from: { pathname: "/" } };
    // let { redirectToReferrer } = this.state;

   

  render() {
    return (
        <div>
        <input placeholder='email' type='email' name='email' onChange={(e)=>{this.handleChange(e)}}/>
        <input placeholder='password' type='password' name ='password'  onChange={(e)=>{this.handleChange(e)}}/>
        <button onClick={this.submit}>
            LogIn        </button>

    </div>
    )
  }
}

