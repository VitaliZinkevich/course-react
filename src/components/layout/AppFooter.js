import React from 'react'
import {Footer} from 'react-materialize'
import {Link} from 'react-router-dom'



const AppFooter = ()=>{

    return (
        
      <Footer 
      className='blue white-text'
      copyrights='Vitali Zinkevich'
      moreLinks={
      <Link to='/contacts' className="white-text right">Контакты</Link>
      }
      links={
        <>
         <Link to='/' className="white-text right">Поиск</Link><br/>
         <Link to='/about' className="white-text right">О компании</Link>
         
        </>}
      >   
    <div className='row'>
    <div className='col s12'>
    <p className="grey-text text-lighten-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>
    
    </div>
    
    
    </Footer>
        
    )



}



export default AppFooter