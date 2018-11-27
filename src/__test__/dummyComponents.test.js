import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';

import About from '../components/dummyComponents/About'
import NoPage from '../components/dummyComponents/NoPage'
import Contacts from '../components/dummyComponents/Contacts'

import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.window.scrollTo = jest.fn()

global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);


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