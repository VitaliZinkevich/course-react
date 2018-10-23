import React from 'react'
import {Button} from 'react-materialize'

const About = ()=>{

    return (
    <main className=''> 
    <Button  faicon='fa fa-plus' className='red' 
    large disabled={true}>
       
    </Button>

     <Button disabled={true} icon='insert_chart' className='red'/>
        <Button  floating icon='format_quote' className='yellow darken-1'/>
        <Button floating icon='publish' className='green'/>
        <Button floating icon='attach_file' className='blue'/>
    </main>
    )
}

export default About