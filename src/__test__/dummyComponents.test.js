import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow, mount } from 'enzyme';

import About from '../components/dummyComponents/About'
import NoPage from '../components/dummyComponents/NoPage'
import Contacts from '../components/dummyComponents/Contacts'

describe('Search form all render', function() {

    it ('Render dummy About with no errors',()=>{
      let instance = shallow(<About/>)
      expect(instance).toMatchSnapshot();
    })

    it ('Render dummy NoPage with no errors',()=>{
        let instance = shallow(<NoPage/>)
        expect(instance).toMatchSnapshot();
    })

    it ('Render dummy Contacts with no errors and send message',()=>{
    
    let instance = shallow(<Contacts/>)
    expect(instance).toMatchSnapshot();

    })


    it ( 'send contact msg', ()=>{
    let instance = shallow(<Contacts/>)

    instance.find ("Input[name='email']").simulate ("change", {target: {name: 'email', value:  'email@email.com'}})
    instance.find ("Input[name='message']").simulate ("change", {target: {name: 'message', value:  'Тестовое сообщения'}})
  
    instance.find('Button#sendMsg').simulate('click') 
    
    expect(instance.state().send).toBe(true);
 
    })

});