import PropTypes from 'prop-types';
import React, { PureComponent } from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {Preloader} from 'react-materialize'
import { Auth } from 'aws-amplify';




 class SingUp extends PureComponent {

    static propTypes ={
        // authPending: PropTypes.bool,
        isAuth: PropTypes.bool,
    }

    state = {
        authPending: false,
        email: null,
        password: null,
        password2: null,
        errors: ['Введите электронную почту','Введите пароль','Пароли не совпадают' ],
        message:'',
        newUser: null,
        validationCode : "",
        singUpError: '',
        confirmCodeError : ''
    }


    componentWillReceiveProps(newProps){
        if (newProps.isAuth === true) {
            if (this.props.location.state !== undefined) {
                this.props.history.push (this.props.location.state.from);
            } else {
                this.props.history.push ('/');
            }
        }
    }

    handleChange=(e, index=null)=>{
        this.setState ({[e.target.name]: e.target.value}, ()=>{this.validate (this.state)});
    }
    
    validate (state) {
        let newErrors = []
        if (state.email === null || state.email === '') {
            newErrors[0]='Введите почту';
        }

        if (state.password === null ||state.password === '' ) {
            newErrors[1]='Введите пароль';
        }

        if (state.password !== state.password2  ) {
            newErrors[2]='Пароли не совпадают';
        }
        this.setState({errors:newErrors})
    }



    submit = async(event)=>{
        event.preventDefault();
        this.setState ({authPending: true});
        try {
			const newUser = await Auth.signUp({
				username: this.state.email,
				password: this.state.password
			});
			this.setState({
				newUser
            });
            this.setState ({authPending: false});
		} catch (e) {
              
            switch (e.code) {
                case "UsernameExistsException": {
                    this.setState({ newUser: undefined });
                    this.setState({ singUpError: 'Такой пользователь существует ,подтвердите его и залогиньтесь. Или залогиньтесь если пользователь подтвержден.' })
                    break;
                }
                case  "InvalidParameterException": {
                    this.setState({ singUpError: e.message })
                    break;
                }
                default : {
                    break;
                }
            }
            this.setState ({authPending: false});
            // Auth.currentAuthenticatedUser()
            //     .then(data => console.log(data))
            //     .catch(err => console.log(err));
			// alert(e.message); // фризит ui
		}
    }

    handleConfirmationSubmit = async event => {
		event.preventDefault();
        this.setState ({authPending: true});
		try {
			await Auth.confirmSignUp(this.state.email, this.state.validationCode);
			await Auth.signIn(this.state.email, this.state.password);
			//this.props.userHasAuthenticated(true);
            this.props.history.push('/');
            this.setState ({authPending: false});
		} catch (e) {
			console.log(e);
            //this.setState({ singUpError: e.message });
            if (e.code === 'NotAuthorizedException') {
                this.setState({confirmCodeError: 'Пользователь уже подтвержден, залогиньтесь'})
            } else {
                this.setState({confirmCodeError: 'Не верный код подтверждения.'})
            }
            this.setState ({authPending: false});
		}
    };
    
    renderConfirmationForm() {

		return (
            <>
                <form onSubmit={this.handleConfirmationSubmit}>
                <p className='red-text'>{this.state.singUpError}</p>
                <p className='red-text'>{this.state.confirmCodeError}</p>
                
                <p>На указанную вами почту выслан код подтверждение, введите его в поле ниже</p>
                    <input type='text' name ='validationCode'   onChange={(e)=>{this.handleChange(e)}}/>
                    <input type='submit' value="Confirm"/>
                </form>
                <br/>
                
            </>
		);
	}

  render() {
   
    return (
    <main className='row'>
            <div className='offset-s3 col s6 center  margin-top-50'>
             {this.state.authPending === true ? (<Preloader color='green' size='big'/>) : this.state.newUser === null ? (<>
                
                <input placeholder='Электронная почта' type='email' name='email' onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[0]}</span>
                <input placeholder='Пароль' type='password' name ='password'  onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[1]}</span>
                <input placeholder='Повторите пароль' type='password' name ='password2'  onChange={(e)=>{this.handleChange(e)}}/>
                <span className='red-text'>{this.state.errors[2]}</span><br/>
                <span className='red-text'>{this.state.singUpError}</span><br/>
                
                <button  
                onClick={this.submit} 
                disabled={this.state.errors.length !== 0}
                className='waves-effect waves-light btn orange darken-2 z-depth-4 margin-top-25 textstrong'>
                Регистрация        
                </button>
                
                <div>
                    {this.state.message !== ''  ? (<div className='center'>{this.state.message } <br/>
                    <Link to={`/login`}> Войти</Link></div> ) : 
                    null}
                </div>
                </>): this.renderConfirmationForm()}    
               </div>
    </main>
    )
  }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.get('isAuth'),
        // authPending: state.auth.get('authPending'),
    }
}

export default connect (mapStateToProps) (SingUp)

