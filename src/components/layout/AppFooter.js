import React from 'react'
import {Footer} from 'react-materialize'
import {Link} from 'react-router-dom'



const AppFooter = ()=>{

    return (
        
      <Footer copyrights="vitali zinkevich"
      moreLinks={
        <Link to='/contacts' className="grey-text text-lighten-4 right">Контакты</Link>
      }
      links={
        <>
         <Link to='/' className="grey-text text-lighten-4 right">Поиск</Link><br/>
         <Link to='/about' className="grey-text text-lighten-4 right">О компании</Link>
         
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