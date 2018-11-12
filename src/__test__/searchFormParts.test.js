import React from 'react';
import renderer from 'react-test-renderer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

// import parts

import NightsForm from '../components/projectFlow/SearchFormParts/NightsForm'
import Persons from '../components/projectFlow/SearchFormParts/Persons'
// import DatePikers from '../components/projectFlow/SearchFormParts/DatePikers'
// import HotelsLists from '../components/projectFlow/SearchFormParts/HotelsLists'
// import StarsForm from '../components/projectFlow/SearchFormParts/StarsForm'
// import FoodForm from '../components/projectFlow/SearchFormParts/FoodForm'

test('Snapshot test search dorm parts', () => {

    const componentNightsForm = renderer.create(
      <NightsForm 
      valueNights={[1]}
      />
    );
  
    let componentNF=componentNightsForm.toJSON();
    expect(componentNF).toMatchSnapshot();
    
    const componentPersons = renderer.create(
        <Persons 
        childrenValue={0}
        adultValue={1}
        />
      );

    let componentP=componentPersons.toJSON();
    expect(componentP).toMatchSnapshot();
 
   
  });




// describe('NightsForm', function() {

//     it ('Snapshot',()=>{
//         let instance = mount(<NightsForm 
//             valueNights={[1]}
//         />)
 


//     })

//   });