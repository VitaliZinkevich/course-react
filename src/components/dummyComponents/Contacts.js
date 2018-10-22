import React from 'react'
import {CollapsibleItem, Collapsible} from 'react-materialize'




const About = ()=>{

    return (
    <main className='center'>
        <Collapsible accordion defaultActiveKey={1}>
                <CollapsibleItem header='First' icon='filter_drama'>
                    Lorem ipsum dolor sit amet.
                </CollapsibleItem>
                <CollapsibleItem header='Second' icon='place'>
                    Lorem ipsum dolor sit amet.
                </CollapsibleItem>
                <CollapsibleItem header='Third' icon='whatshot'>
                    Lorem ipsum dolor sit amet.
                </CollapsibleItem>
        </Collapsible>
    </main>
    )



}



export default About