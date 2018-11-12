import React from 'react';
import renderer from 'react-test-renderer';

// import parts

import NightsForm from '../components/projectFlow/SearchFormParts/NightsForm'
import Persons from '../components/projectFlow/SearchFormParts/Persons'
import DatePickers from '../components/projectFlow/SearchFormParts/DatePickers'
import HotelsLists from '../components/projectFlow/SearchFormParts/HotelsLists'
import StarsForm from '../components/projectFlow/SearchFormParts/StarsForm'
import FoodForm from '../components/projectFlow/SearchFormParts/FoodFrom'

import {fromJS} from 'immutable'

test('Snapshot test for search form parts', () => {

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

    const componentDatePickers = renderer.create(
      
        <DatePickers 
        valueFrom={null}
        valueTo={null}
        />
  
          
      );

    let componentDP=componentDatePickers.toJSON();
    expect(componentDP).toMatchSnapshot();
    
    let mockHotels = [{"_id" : "5b06859e5089ec123b9e668c",
                        "type" : "санаторий",
                        "name" : "Берестье",
                        "region" : "Минская область",
                        "stars" : 2,
                        "rooms": [{name:'Одноместный номер', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
                                {name:'Двухместный номер', accomodation:['2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
                                {name:'Двухместный номер люкс', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }],
                        description: {
                            text:'санаторий Берестье (КУП «Брестагроздравница») расположен на территории курорта Белое озеро в Брестском районе. Санаторий находится в окружении массива сосново-лиственного леса уникального биосферного резервата и ландшафтного заказника «Прибужское Полесье». Территория санатория примыкает к озеру Рогознянское, которое соединяется каналом с озером Белое, Черное и далее Тайное. На территории санатория произрастают сосна, ель, береза, плодово-садовые деревья.',
                            fotos:['https://sanatorii.by/images/obj/89/c2598he5_433_true.jpg', 'http://belarus.svobodno.su/images/recovery/sanatoriy-bereste-0.jpg', 'https://i.ytimg.com/vi/h1TaZmN2waY/maxresdefault.jpg']
                        }

                        },
                        {"_id" : "5b06859e5089ec123b9e668f",
                        "type" : "санаторий",
                        "name" : "Белая вежа",
                        "region" : "Минская область",
                        "stars" : 3,
                        "rooms": [{name:'Одноместный номер с балконом', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
                                    {name:'Двухместный двухкомнаный номер', accomodation:['2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
                                    {name:'Двухместный номер двухкомнаный номер люкс', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }]
                        }]

        mockHotels = fromJS(mockHotels)

    const componentHotelsLists = renderer.create(
      
        <HotelsLists 
        hotels={mockHotels}
        selectedHotels={[]}
        />
  
          
      );

    let componentHL=componentHotelsLists.toJSON();
    expect(componentHL).toMatchSnapshot();
   

    const componentStarsForm = renderer.create(
      
        <StarsForm 
         />
        );

    let componentSF=componentStarsForm.toJSON();
    expect(componentSF).toMatchSnapshot();


    const componentFoodForm = renderer.create(
      
        <FoodForm 
        foodValue={'Any'}
         />
        );

   
    let componentFF=componentFoodForm.toJSON();
    expect(componentFF).toMatchSnapshot();
    
    
  });

